import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DetallesMedicoRoutes } from './detalles-medico.routes';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { DetallesMedicoComponent } from './detalles-medico.component';
import { DetallesMedicoService } from './detalles-medico.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';

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
  ],
  declarations: [DetallesMedicoComponent],
  entryComponents: [DetallesMedicoComponent],
  providers: [DetallesMedicoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DetallesMedicoComponent],
})
export class DetallesMedicoModule {}
