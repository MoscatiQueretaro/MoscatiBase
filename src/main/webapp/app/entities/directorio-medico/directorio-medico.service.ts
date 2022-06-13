import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { DamnerService } from '../../services/damner.service';
import { DirectorioMedicoModel } from './directorio-medico.model';

@Injectable()
export class DirectorioMedicoService extends DamnerService<DirectorioMedicoModel> {
  private url = SERVER_API_URL + 'api/directoriomedico';

  constructor(protected http: HttpClient) {
    super(http, 'directoriomedico');
  }
}
