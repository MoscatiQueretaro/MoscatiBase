import { Injectable } from '@angular/core';
import { DamnerService } from '../../services/damner.service';
import { AgoraModel } from './join-chanel-video.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JoinChatService extends DamnerService<AgoraModel> {
  constructor(protected http: HttpClient) {
    super(http, 'agora');
  }

  createRtmAgoraToken(agoraModel: AgoraModel): Observable<HttpResponse<AgoraModel>> {
    return this.http
      .post<AgoraModel>(this.resourceUrl + '/rtm', agoraModel, { observe: 'response' })
      .pipe(map((res: HttpResponse<AgoraModel>) => this.convertResponse(res)));
  }
}
