import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../../app.constants';
import { DamnerService } from '../../../services/damner.service';
import { DetallesMedicoModel } from './detalles-medico.model';
import { Observable } from 'rxjs';
import { NotificationsUserModel } from '../../user-notifications/user-notifications.model';
import { map } from 'rxjs/operators';
type ArrayResponseType = HttpResponse<DetallesMedicoModel[]>;

@Injectable()
export class DetallesMedicoService extends DamnerService<DetallesMedicoModel> {
  private url = SERVER_API_URL + 'api/horariosMedicos';

  constructor(protected http: HttpClient) {
    super(http, 'horariosMedicos');
  }

  public findAllHorariosById(userId: number): Observable<ArrayResponseType> {
    return this.http
      .get<DetallesMedicoModel[]>(`${this.url}/${userId}`, { observe: 'response' })
      .pipe(map(this.convertArrayResponse.bind(this)));
  }
}
