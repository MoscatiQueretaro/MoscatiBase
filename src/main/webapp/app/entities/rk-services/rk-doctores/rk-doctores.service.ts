import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DamnerService } from '../../../services/damner.service';
import { SERVER_API_URL } from '../../../app.constants';
import { RkDoctoresModel } from './rk-doctores.model';

@Injectable()
export class RkDoctoresService extends DamnerService<RkDoctoresModel> {
  private url = SERVER_API_URL + 'api/rkdoctores';

  constructor(protected http: HttpClient) {
    super(http, 'rkdoctores');
  }

  public findOneMedicByProfessionalLicence(professionalLicence: string): Observable<HttpResponse<RkDoctoresModel>> {
    return this.http
      .get<RkDoctoresModel>(`${this.url}/${professionalLicence}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<RkDoctoresModel>) => this.convertResponse(res)));
  }
}
