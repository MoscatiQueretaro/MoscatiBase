import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { EspecialidadesAutocompleteModule } from '../directorio-medico/autocomplete/especialidades.autocomplete.module';
import { EtapaCitaModule } from '../citas/bandejas-citas/etapa-cita.module';
import { PromocionesComponent } from './promociones.component';
import { PromocionesService } from './promociones.service';
import { RouterModule } from '@angular/router';
import { PromocionesRoutes } from './promociones.routes';
const ROUTES = [...PromocionesRoutes];

@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    UserNotificationsModule,
    RouterModule.forChild(ROUTES),
    EspecialidadesAutocompleteModule,
    CommonModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
    EtapaCitaModule,
  ],
  declarations: [PromocionesComponent],
  entryComponents: [PromocionesComponent],
  providers: [PromocionesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PromocionesComponent],
})
export class PromocionesModule {}
