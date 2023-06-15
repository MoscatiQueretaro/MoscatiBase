import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EspecialidadesAutocompleteComponent } from './especialidades.autocomplete.component';
import { EspecialidadesService } from '../../catalogos/especialidades/especialidades.service';
import { SharedModule } from '../../../shared/shared.module';
import { FilesModule } from '../../../utils/components/files.module';

@NgModule({
  imports: [SharedModule, FilesModule],
  declarations: [EspecialidadesAutocompleteComponent],
  providers: [EspecialidadesService],
  exports: [EspecialidadesAutocompleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EspecialidadesAutocompleteModule {}
