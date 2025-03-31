import {
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routes';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { LoginService } from '@services/login-service';
import { ServiceUtils } from '@utils/services-util';
import { SessionService } from '@utils/session-util';

const components = [LoginComponent];

const imports = [
  CommonModule,
  LoginRouting,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  RouterModule,
  MatToolbarModule, MatButtonModule, MatIconModule, MatSlideToggleModule
  
];

const providers = [
  LoginService,
  ServiceUtils,
  SessionService
];

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
})
export class LoginModule {}