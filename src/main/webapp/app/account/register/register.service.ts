import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Registration } from './register.model';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerUserModel } from '../../core/auth/account.model';
type EntityResponseType = HttpResponse<DamnerUserModel>;

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private API_URL = SERVER_API_URL + 'api/register';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(registration: Registration): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/register'), registration);
  }

  create(user: DamnerUserModel): Observable<EntityResponseType> {
    return this.http.post<DamnerUserModel>(this.API_URL, user, { observe: 'response' });
  }
}
