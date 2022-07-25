import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../../user-notifications/user-notifications.module';
import { ResumenPagoComponent } from './resumen-pago.component';
import { ResumenPagoService } from './resumen-pago.service';
import { LoadersModule } from '../../../utils/components/loader/loaders.module';

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
  declarations: [ResumenPagoComponent],
  entryComponents: [ResumenPagoComponent],
  providers: [ResumenPagoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ResumenPagoComponent],
})
export class ResumenPagoModule {}
