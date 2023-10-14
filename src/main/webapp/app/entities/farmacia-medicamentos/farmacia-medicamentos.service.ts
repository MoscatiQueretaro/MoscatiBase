import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FarmaciaMedicamentosModel } from './farmacia-medicamentos.model';
import { DamnerService } from '../../services/damner.service';

@Injectable()
export class FarmaciaMedicamentosService extends DamnerService<FarmaciaMedicamentosModel> {
  constructor(protected http: HttpClient) {
    super(http, 'medicamentos');
  }
}
