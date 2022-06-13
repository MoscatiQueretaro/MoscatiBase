import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotificationsUserModel } from './user-notifications.model';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';

type ArrayResponseType = HttpResponse<NotificationsUserModel[]>;

@Injectable()
export class UserNotificationsService extends DamnerService<NotificationsUserModel> {
  private url = SERVER_API_URL + 'api/notificationsUser';

  constructor(protected http: HttpClient) {
    super(http, 'notificationsUser');
  }
  public findAllNotificationsById(id: number): Observable<ArrayResponseType> {
    return this.http
      .get<NotificationsUserModel[]>(`${this.url}/${id}`, { observe: 'response' })
      .pipe(map(this.convertArrayResponse.bind(this)));
  }
}
