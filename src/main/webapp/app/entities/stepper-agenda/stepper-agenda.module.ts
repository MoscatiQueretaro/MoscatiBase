import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { StepperAgendaRoutes } from './stepper-agenda.routes';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { StepperAgendaComponent } from './stepper-agenda.component';

import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { DirectorioMedicoModule } from '../directorio-medico/directorio-medico.module';
import { HorarioCitaModule } from './horario-cita/horario-cita.module';
import { DatepickerModule } from '../../utils/datepicker/datepicker.module';
import { DetallesMedicoModule } from './detalles-medico/detalles-medico.module';
import { ResumenPagoModule } from './resumen-pago/resumen-pago.module';

const ROUTES = [...StepperAgendaRoutes];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    MatTabsModule,
    UserNotificationsModule,
    CommonModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
    DirectorioMedicoModule,
    HorarioCitaModule,
    DatepickerModule,
    DetallesMedicoModule,
    ResumenPagoModule,
  ],
  declarations: [StepperAgendaComponent],
  entryComponents: [StepperAgendaComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepperAgendaModule {}
