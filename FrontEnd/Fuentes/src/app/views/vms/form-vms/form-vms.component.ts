import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@common/modal/modal.service';

@Component({
  selector: 'screen-form-vms',
  templateUrl: './form-vms.component.html',
})
export class FormVmsComponent implements OnInit {
  @Output() saveForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataElement: any;
  public formVms: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.formVms = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required])],
      cores: [null, Validators.compose([Validators.required])],
      ram: [null, Validators.compose([Validators.required])],
      disk: [null, Validators.compose([Validators.required])],
      os: [null, Validators.compose([Validators.required])],
      status: [null],
      creationDate: [{ value: null, disabled: true }],
      updateDate: [{ value: null, disabled: true }]
    });

    this.loadValues();
  }

  public loadValues() {
    if (this.dataElement) {
      const dataElementMap = new Map(Object.entries(this.dataElement));

      dataElementMap.forEach((value, key) => {
        this.formVms.controls[key].setValue(value);
      });
    }
  }

  public closeModal() {
    this.modalService.close('vmsModal');
  }

  public processForm() {
    this.saveForm.emit(this.formVms.getRawValue());
  }
}