import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceUtils } from '@utils/services-util';
import { ResponseLoginRequest } from '@models/usersModelDto';
import { ServicesRoutes } from '@utils/services-routes';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private serviceUtils: ServiceUtils,
  ) { }

  public doLogin(data: any): Observable<ResponseLoginRequest> {
    return this.serviceUtils.buildRequest(ServicesRoutes.loginUsers, 'post', data);
  }
}