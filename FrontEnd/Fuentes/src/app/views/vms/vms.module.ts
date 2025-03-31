import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VmsComponent } from './vms.component';
import { VmsRouting } from './vms.routes';
import { ServiceUtils } from '@utils/services-util';
import { SessionService } from '@utils/session-util';
import { SharedModule } from '@shared/shared.module';
import { VmsService } from '@services/vms.service';
import { ModalModule } from '@common/modal/modal.module';
import { ModalService } from '@common/modal/modal.service';
import { MainHttpInterceptor } from '@interceptors/main-http-interceptor';
import { FormVmsComponent } from './form-vms/form-vms.component';
import { NgModule } from '@angular/core';

const components = [
  VmsComponent,
  FormVmsComponent
];

const imports = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  ModalModule,
  ReactiveFormsModule,
  RouterModule,
  SharedModule,
  VmsRouting
];

const providers = [
  VmsService,
  ModalService,
  SessionService,
  ServiceUtils,
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: MainHttpInterceptor
  },
];

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
})
export class VmsModule { }
