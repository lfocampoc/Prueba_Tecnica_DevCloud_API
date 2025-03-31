import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '@utils/session-util';

@Injectable({ providedIn: 'root' })
export class ProtectedAuth implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});

    return false;
  }
}
