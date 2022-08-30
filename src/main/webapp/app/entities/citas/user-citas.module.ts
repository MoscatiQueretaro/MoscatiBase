import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { UserCitasComponent } from './user-citas.component';
import { UserCitasService } from './user-citas.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { EspecialidadesAutocompleteModule } from '../directorio-medico/autocomplete/especialidades.autocomplete.module';
import { EtapaCitaModule } from './bandejas-citas/etapa-cita.module';
import { UserCitasRoutes } from './user-citas.routes';
import { RouterModule } from '@angular/router';
const ROUTES = [...UserCitasRoutes];
@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    RouterModule.forChild(ROUTES),
    UserNotificationsModule,
    EspecialidadesAutocompleteModule,
    CommonModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
    EtapaCitaModule,
  ],
  declarations: [UserCitasComponent],
  entryComponents: [UserCitasComponent],
  providers: [UserCitasService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserCitasComponent],
})
export class UserCitasModule {}
