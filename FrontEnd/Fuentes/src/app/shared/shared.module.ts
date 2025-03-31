import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { SessionService } from '@utils/session-util';

const components = [
  HeaderComponent,
  FooterComponent];

const imports = [
  CommonModule,
  FormsModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatToolbarModule
];

const providers = [
  SessionService
]

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers
})
export class SharedModule {}