import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserMenuModel } from './user-menu.model';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';

type ArrayResponseType = HttpResponse<UserMenuModel[]>;

@Injectable()
export class UserMenuService extends DamnerService<UserMenuModel> {
  private url = SERVER_API_URL + 'api/horariosMedicos';

  constructor(protected http: HttpClient) {
    super(http, 'horariosMedicos');
  }
  public getHorariosMedicosByUser(userId: number): Observable<ArrayResponseType> {
    return this.http.get<UserMenuModel[]>(`${this.url}/${userId}`, { observe: 'response' }).pipe(map(this.convertArrayResponse.bind(this)));
  }
}
