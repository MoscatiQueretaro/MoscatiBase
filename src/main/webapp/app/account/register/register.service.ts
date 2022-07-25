import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Registration } from './register.model';
import { SERVER_API_URL } from '../../app.constants';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { map } from 'rxjs/operators';
import { DamnerService } from '../../services/damner.service';
type EntityResponseType = HttpResponse<MoscatiUserModel>;

@Injectable({ providedIn: 'root' })
export class RegisterService extends DamnerService<MoscatiUserModel> {
  private API_URL = SERVER_API_URL + 'api/register';

  constructor(public http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    super(http, 'photo-user-album');
  }

  save(registration: Registration): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/register'), registration);
  }

  create(user: MoscatiUserModel): Observable<EntityResponseType> {
    return this.http
      .post<MoscatiUserModel>(this.API_URL, user, { observe: 'response' })
      .pipe(map((res: HttpResponse<MoscatiUserModel>) => this.convertResponse(res)));
  }
}
