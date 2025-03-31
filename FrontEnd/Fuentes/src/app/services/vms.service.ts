import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceUtils } from '@utils/services-util';
import { buildRoute, ServicesRoutes } from '@utils/services-routes';
import { ResponseVmsDto, VmsModelDto } from '@models/vmsModelDto';

@Injectable({
  providedIn: 'root',
})
export class VmsService {
  constructor(
    private serviceUtils: ServiceUtils,
  ) { }

  public getVms(): Observable<ResponseVmsDto> {
    return this.serviceUtils.buildRequest(ServicesRoutes.getVms, 'get');
  }

  public setVms(data: VmsModelDto): Observable<any> {
    return this.serviceUtils.buildRequest(ServicesRoutes.setVms, 'post', data);
  }

  public putVms(data: VmsModelDto): Observable<any> {
    return this.serviceUtils.buildRequest(buildRoute(ServicesRoutes.putVms, {
      idVms: data.id
    }), 'put', data);
  }

  public deleteVms(data: VmsModelDto): Observable<any> {
    return this.serviceUtils.buildRequest(buildRoute(ServicesRoutes.deleteVms, {
      idVms: data.id
    }), 'delete');
  }
}