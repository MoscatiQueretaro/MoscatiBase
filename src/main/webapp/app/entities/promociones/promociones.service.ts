import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';
import { PromocionesModel } from './promociones.model';

@Injectable()
export class PromocionesService extends DamnerService<PromocionesModel> {
  private url = SERVER_API_URL + 'api/promociones';

  constructor(protected http: HttpClient) {
    super(http, 'promociones');
  }
}
