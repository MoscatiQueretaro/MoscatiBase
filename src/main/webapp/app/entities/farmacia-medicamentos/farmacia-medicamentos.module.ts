import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FarmaciaMedicamentosComponent } from './farmacia-medicamentos.component';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { FarmaciaMedicamentosService } from './farmacia-medicamentos.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [SharedModule, MatTabsModule, CommonModule, MatTableModule, FilesModule, FontAwesomeModule, MatDividerModule, LoadersModule],
  declarations: [FarmaciaMedicamentosComponent],
  entryComponents: [FarmaciaMedicamentosComponent],
  providers: [FarmaciaMedicamentosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FarmaciaMedicamentosComponent],
})
export class FarmaciaMedicamentosModule {}
