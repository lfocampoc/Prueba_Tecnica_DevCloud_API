import {
  NgModule, NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { RouterModule } from '@angular/router';
import { ModalService } from './modal.service';

const imports = [
  CommonModule,
  RouterModule,
];

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: imports,
  providers: [ModalService],
  schemas: [NO_ERRORS_SCHEMA],
})

export class ModalModule {}
