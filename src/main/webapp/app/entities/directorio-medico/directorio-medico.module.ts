import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DirectorioMedicoRoutes } from './directorio-medico.routes';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { DirectorioMedicoComponent } from './directorio-medico.component';
import { DirectorioMedicoService } from './directorio-medico.service';
import { EspecialidadesAutocompleteModule } from './autocomplete/especialidades.autocomplete.module';
import { LoadersModule } from '../../utils/components/loader/loaders.module';

const ROUTES = [...DirectorioMedicoRoutes];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    MatTabsModule,
    UserNotificationsModule,
    EspecialidadesAutocompleteModule,
    CommonModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    LoadersModule,
  ],
  declarations: [DirectorioMedicoComponent],
  entryComponents: [DirectorioMedicoComponent],
  providers: [DirectorioMedicoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DirectorioMedicoModule {}
