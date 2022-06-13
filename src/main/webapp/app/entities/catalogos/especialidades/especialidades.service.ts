import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EspecialidadesModel } from './especialidades.model';
import { DamnerService } from '../../../services/damner.service';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class EspecialidadesService extends DamnerService<EspecialidadesModel> {
  private url = SERVER_API_URL + 'api/especialidades';

  constructor(protected http: HttpClient) {
    super(http, 'especialidades');
  }
}
