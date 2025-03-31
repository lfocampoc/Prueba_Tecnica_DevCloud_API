import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalService } from './modal.service';
import { ThemeService } from '@services/theme-service';

@Component({
  selector: 'screen-modal',
  template:
    `<div class="mat-typography" [ngClass]="themeService.themeSignal()">
      <div class="mat-app-background">
        <div class="modal-component">
          <div class="modal-component-wrapper {{ extraClassWrapper }}">
            <i class="modal-component-close"></i>
            <div class="modal-component-content">
              <ng-content></ng-content>
            </div>
          </div>
        </div>
        <div class="modal-component-overlay"></div>
      </div>
    </div>`,
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() extraClassWrapper = '';
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  themeService: ThemeService = inject(ThemeService);

  private element: any;

  constructor(
    private el: ElementRef,
    private modalService: ModalService,
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const self = this;

    if (!this.id) {
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', function(e: any) {
      if (e.target.className === 'modal-component-close') {
        self.close();
        self.closed.emit(true);
      }
    });

    this.modalService.add(this);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-component-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-component-open');
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }
}