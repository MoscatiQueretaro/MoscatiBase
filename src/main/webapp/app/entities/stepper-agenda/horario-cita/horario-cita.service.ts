import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../../app.constants';
import { DamnerService } from '../../../services/damner.service';
import { HorariosDisponiblesModel } from './horario-cita.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCitasModel } from '../../citas/user-citas.model';
type ArrayResponseType = HttpResponse<HorariosDisponiblesModel[]>;

@Injectable()
export class HorarioCitaService extends DamnerService<UserCitasModel> {
  private url = SERVER_API_URL + 'api/userCitas';

  constructor(protected http: HttpClient) {
    super(http, 'userCitas');
  }

  public findAllHorariosDisponibles(horarioSolicitud: UserCitasModel): Observable<ArrayResponseType> {
    return this.http
      .post<HorariosDisponiblesModel[]>(this.url + '/disponibles', horarioSolicitud, { observe: 'response' })
      .pipe(map((res: HttpResponse<HorariosDisponiblesModel[]>) => this.convertArrayResponse2(res)));
  }

  protected convertArrayResponse2(res: HttpResponse<HorariosDisponiblesModel[]>): HttpResponse<HorariosDisponiblesModel[]> {
    const body: HorariosDisponiblesModel[] = [];
    if (res.body) {
      const jsonResponse: HorariosDisponiblesModel[] = res.body;
      for (let i = 0; i < jsonResponse.length; i++) {
        body.push(this.convertItemFromServer2(jsonResponse[i]));
      }
    }
    return res.clone({ body });
  }

  protected convertItemFromServer2(entity: HorariosDisponiblesModel): HorariosDisponiblesModel {
    const copy: HorariosDisponiblesModel = Object.assign({}, entity);
    return copy;
  }
}
