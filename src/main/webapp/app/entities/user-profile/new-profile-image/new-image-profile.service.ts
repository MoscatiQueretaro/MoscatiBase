import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PhotoUserAlbumModel } from './photo-user-album.model';
import { DamnerService } from '../../../services/damner.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class NewImageProfileService extends DamnerService<PhotoUserAlbumModel> {
  private accountApi = SERVER_API_URL + 'api/account';

  constructor(protected http: HttpClient) {
    super(http, 'photo-user-album');
  }

  updatePhotoUser(entity: PhotoUserAlbumModel): Observable<HttpResponse<PhotoUserAlbumModel>> {
    const copy = this.convert(entity);
    return this.http
      .post<PhotoUserAlbumModel>(`${this.accountApi}/update-photo-user`, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<PhotoUserAlbumModel>) => this.convertResponse(res)));
  }
}
