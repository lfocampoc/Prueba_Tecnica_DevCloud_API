import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '@config/index';
import { Injectable } from '@angular/core';
import { SessionService } from './session-util';

@Injectable()
export class ServiceUtils {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public buildRequest(endpoint: any, method: 'get' | 'post' | 'put' | 'delete', data?: any, isTextResponse?: any) {
    let headers = Config.api.options.headers;

    if (endpoint.requiredAuth) {
      headers = headers.set('Authorization', 'seguridad ' + this.sessionService.getToken());
    } else {
      headers = headers.delete('Authorization');
    }

    if (endpoint.ipRemote) {
      headers = headers.set('ipRemota', endpoint.ipRemote);
    } else {
      headers = headers.delete('ipRemota');
    }

    if (endpoint.removeHeaderAccept) {
      headers = headers.delete('Accept');
    } else {
      headers = headers.set('Accept', 'application/json');
    }

    if (endpoint.removeContentType) {
      headers = headers.delete('Content-Type');
    } else {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (endpoint.removeAcceptTextPlain) {
      headers = headers.set('Accept', 'application/json;');
    } else {
      headers = headers.set('Accept', 'application/json');
    }

    const options = {
      headers,
      params: method === 'get' ? (data ? new HttpParams({ fromObject: data }) : undefined) : undefined,
      responseType: isTextResponse ? 'text' as 'json' : 'json'
    };

    switch (method) {
      case 'delete':
        return this.http.request('delete', endpoint.url, { body: data, ...options });
      case 'get':
        return this.http.get<any>(endpoint.url, options);
      case 'post':
        return this.http.post<any>(endpoint.url, data, options);
      case 'put':
        return this.http.put<any>(endpoint.url, data, options);
      default:
        throw new Error('Unsupported HTTP method');
    }
  }
}