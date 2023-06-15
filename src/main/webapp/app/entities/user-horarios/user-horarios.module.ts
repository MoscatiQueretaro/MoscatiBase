import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserHorariosComponent } from './user-horarios.component';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserHorariosService } from './user-horarios.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [SharedModule, MatTabsModule, CommonModule, MatTableModule, FilesModule, FontAwesomeModule, MatDividerModule, LoadersModule],
  declarations: [UserHorariosComponent],
  entryComponents: [UserHorariosComponent],
  providers: [UserHorariosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserHorariosComponent],
})
export class UserHorariosModule {}
