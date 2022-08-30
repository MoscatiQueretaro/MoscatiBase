import { Injectable } from '@angular/core';
import { DamnerService } from '../../../services/damner.service';
import { HttpClient } from '@angular/common/http';
import { EtapaCitaModel } from '../../citas/bandejas-citas/etapa-cita.model';

@Injectable()
export class EtapaCitaService extends DamnerService<EtapaCitaModel> {
  constructor(protected http: HttpClient) {
    super(http, 'etapaCita');
  }
}
