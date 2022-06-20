import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';
import { DetallesMedicoModel } from './detalles-medico.model';

@Injectable()
export class DetallesMedicoService extends DamnerService<DetallesMedicoModel> {
  private url = SERVER_API_URL + 'api/directoriomedico';

  constructor(protected http: HttpClient) {
    super(http, 'directoriomedico');
  }
}
