import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../../user-notifications/user-notifications.module';
import { HorarioCitaSolicitudComponent } from './horario-cita-solicitud.component';
import { HorarioCitaService } from './horario-cita.service';
import { LoadersModule } from '../../../utils/components/loader/loaders.module';
import { DatepickerModule } from '../../../utils/datepicker/datepicker.module';

@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    UserNotificationsModule,
    CommonModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
    DatepickerModule,
  ],
  declarations: [HorarioCitaSolicitudComponent],
  entryComponents: [HorarioCitaSolicitudComponent],
  providers: [HorarioCitaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [HorarioCitaSolicitudComponent],
})
export class HorarioCitaModule {}
