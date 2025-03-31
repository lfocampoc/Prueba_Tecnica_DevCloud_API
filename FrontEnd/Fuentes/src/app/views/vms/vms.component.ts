import {
  Component,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import { CustomIconService } from '../../common/custom-icons/custom-icon.service';
import { VmsService } from '@services/vms.service';
import { MatAccordion } from '@angular/material/expansion';
import { VmsModelDto } from '@models/vmsModelDto';
import { ModalService } from '@common/modal/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '@utils/session-util';
import { UsersModel } from '@models/usersModelDto';
import { WebSocketService } from '@services/websocket.service';
import { Subscription } from 'rxjs';
import { environment } from '@environments/environment'

@Component({
  selector: 'screen-vms',
  templateUrl: './vms.component.html',
})
export class VmsComponent implements OnInit {
  accordion = viewChild.required(MatAccordion);
  private _snackBar = inject(MatSnackBar);
  readonly panelOpenState = signal(false);
  public showModal: boolean
  public modeModal: string
  public nombreTabla: string;
  public dataElement: any
  public idModal = 'vmsModal';
  public userLogin: any

  public vmsListData: VmsModelDto[] = []
  public messages: string[] = [];

  private wsSubscription: Subscription;

  constructor(
    private customIconService: CustomIconService,
    private vmsService: VmsService,
    private modalService: ModalService,
    private webSocketService: WebSocketService,
    public sessionService: SessionService,
  ) {
    this.userLogin = this.sessionService.getSessionData();
    this.customIconService.init();
  }

  ngOnInit(): void {
    // Conectamos al servidor WebSocket
    this.webSocketService.connect(environment.webSocketUrl);

    this.wsSubscription = this.webSocketService.getMessages().subscribe((message: string) => {
      console.log('Mensaje recibido desde WebSocket:', message);
      this.refleshVmsList()
    });

    // Se valida si no es administrador
    if (this.userLogin?.TypeUser == 2) {
      this.openSnackBar("Usted no es administrador, no podra ni editar ni elimiar Información");
    }

    this.refleshVmsList();
  }

  refleshVmsList() {
    this.vmsService.getVms().subscribe({
      next: (vmsResponse) => {
        this.vmsListData = vmsResponse.data
      },
      error: (error) => {
        console.log(error)
        this.sessionService.logoutUser();
      }
    })
  }

  processFormulary(data?: any) {
    this.dataElement = data;
    this.showModal = false;
    
    setTimeout(() => {
      this.showModal = true;
      this.modalService.open(this.idModal);
    });
  }

  saveForm(event: any) {
    const data = event;

    if (this.modeModal === 'edit') {
      this.vmsService.putVms(data).subscribe({
        next: (response) => {
          // this.refleshVmsList();
          this.openSnackBar(response.message);
        },
        error: (error) => {
          this.openSnackBar(error);
        },
        complete: () => {
          this.modalClose();
          
        }
      })
    } else {
      this.vmsService.setVms(data).subscribe({
        next: (response) => {
          // this.refleshVmsList();
          this.openSnackBar(response.message);
        },
        error: (error) => {
          this.openSnackBar(error);
        },
        complete: () => {
          this.modalClose();
        }
      })
    }
  }

  deleteVms(entidad: VmsModelDto) {
    this.vmsService.deleteVms(entidad).subscribe({
      next: (response) => {
        // this.refleshVmsList();
        this.openSnackBar(response.message);
      },
      error: () => {

      },
    })
  }

  modalClose() {
    this.modalService.close(this.idModal);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  updateItems(message: string): void {
    // Actualiza el listado de registros, aquí puedes hacer una llamada a tu API para obtener los datos actualizados

    this.refleshVmsList()
  }
}