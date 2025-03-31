import {
  Routes,
  RouterModule,
} from '@angular/router';
import { NgModule } from '@angular/core';
import { VmsComponent } from './vms.component';

const routes: Routes = [
  { path: '', component: VmsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmsRouting { }