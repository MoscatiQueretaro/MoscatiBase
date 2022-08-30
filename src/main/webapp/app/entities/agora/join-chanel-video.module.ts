import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { JoinChanelVideoComponent } from './join-chanel-video.component';
import { JoinChanelVideoService } from './join-chanel-video.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { EspecialidadesAutocompleteModule } from '../directorio-medico/autocomplete/especialidades.autocomplete.module';
import { JoinChanelVideoRoutes } from './join-chanel-video.routes';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';
import { UserCitasService } from '../citas/user-citas.service';
const ROUTES = [...JoinChanelVideoRoutes];

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
  ],
  declarations: [JoinChanelVideoComponent],
  entryComponents: [JoinChanelVideoComponent],
  providers: [JoinChanelVideoService, AccountService, UserCitasService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [JoinChanelVideoComponent],
})
export class JoinChanelVideoModule {}
