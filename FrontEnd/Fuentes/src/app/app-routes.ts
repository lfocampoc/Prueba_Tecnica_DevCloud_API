import { Routes } from '@angular/router';
import { ProtectedAuth } from './guards/session-auth.guard';

const AppRoutes: Routes = [
  {
    loadChildren: () => import('@views/login/login.module').then((m) => m.LoginModule),
    path: '',
  },
  {
    // Rutas protejidas para que no pueda entra si no a iniciado sesion
    canActivate: [ProtectedAuth],
    loadChildren: () => import('@views/vms/vms.module').then((m) => m.VmsModule),
    path: 'virtualmachine',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'virtualmachine'
  }
];

export { AppRoutes };