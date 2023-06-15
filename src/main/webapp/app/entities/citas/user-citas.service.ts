import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';
import { UserCitasModel } from './user-citas.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../core/request/request-util';
import { map } from 'rxjs/operators';

@Injectable()
export class UserCitasService extends DamnerService<UserCitasModel> {
  constructor(protected http: HttpClient) {
    super(http, 'userCitas');
  }
  /* eslint-disable */

  public countquery(params: any): Observable<HttpResponse<number>> {
    const options = createRequestOption(params);
    return this.http
      .get<number>(`${this.resourceUrl}/count`, { observe: 'response', params: options })
      .pipe(map((res: HttpResponse<number>) => this.convertNumberResponse(res)));
  }

  private convertNumberResponse(res: HttpResponse<any>): HttpResponse<any> {
    const body: number = this.convertNumberFromServer(res.body);
    return res.clone({ body });
  }

  private convertNumberFromServer(numero: number): number {
    const copy: number = 0 + numero;
    return copy;
  }
}
