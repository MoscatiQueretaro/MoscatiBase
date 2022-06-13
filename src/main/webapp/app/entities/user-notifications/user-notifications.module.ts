import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserNotificationsComponent } from './user-notifications.component';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserNotificationsService } from './user-notifications.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';

@NgModule({
  imports: [SharedModule, MatTabsModule, CommonModule, FilesModule, FontAwesomeModule, MatDividerModule, LoadersModule],
  declarations: [UserNotificationsComponent],
  entryComponents: [UserNotificationsComponent],
  providers: [UserNotificationsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserNotificationsComponent],
})
export class UserNotificationsModule {}
