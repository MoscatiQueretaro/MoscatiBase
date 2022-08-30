import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../../../../shared/shared.module';
import { FilesModule } from '../../../../utils/components/files.module';
import { LoadersModule } from '../../../../utils/components/loader/loaders.module';
import { StripeSuccessComponent } from './stripe-success.component';
import { StripeRoutes } from './stripe.routes';
import { RouterModule } from '@angular/router';
import { HorarioCitaService } from '../../horario-cita/horario-cita.service';

const ROUTES = [...StripeRoutes];

@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    CommonModule,
    FilesModule,
    RouterModule.forChild(ROUTES),
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
  ],
  declarations: [StripeSuccessComponent],
  entryComponents: [StripeSuccessComponent],
  providers: [HorarioCitaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [StripeSuccessComponent],
})
export class StripeModule {}
