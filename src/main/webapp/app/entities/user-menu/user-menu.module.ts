import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserMenuComponent } from './user-menu.component';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserMenuService } from './user-menu.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [SharedModule, MatTabsModule, CommonModule, MatTableModule, FilesModule, FontAwesomeModule, MatDividerModule, LoadersModule],
  declarations: [UserMenuComponent],
  entryComponents: [UserMenuComponent],
  providers: [UserMenuService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}
