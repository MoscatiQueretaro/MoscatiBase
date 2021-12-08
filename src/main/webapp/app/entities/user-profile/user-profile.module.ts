import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutes } from './user-profile.routes';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { NewImageProfilePopupService } from './new-profile-image/new-image-profile-popup.service';
import { NewImageProfileFormComponent } from './new-profile-image/new-image-profile-form.component';
import { NewImageProfileService } from './new-profile-image/new-image-profile.service';
import {MatDividerModule} from "@angular/material/divider";

const ROUTES = [...UserProfileRoutes];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ROUTES), MatTabsModule, CommonModule, FilesModule, FontAwesomeModule, MatDividerModule],
  declarations: [UserProfileComponent, NewImageProfileFormComponent],
  entryComponents: [UserProfileComponent, NewImageProfileFormComponent],
  providers: [NewImageProfilePopupService, NewImageProfileService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileModule {}
