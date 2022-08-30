import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EtapaCitaComponent } from './etapa-cita.component';
import { SharedModule } from '../../../shared/shared.module';
import { EtapaCitaService } from '../../catalogos/etapa-cita/etapa-cita.service';
import { UserCitasService } from '../user-citas.service';

@NgModule({
  imports: [SharedModule],
  declarations: [EtapaCitaComponent],
  providers: [EtapaCitaService, UserCitasService],
  exports: [EtapaCitaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EtapaCitaModule {}
