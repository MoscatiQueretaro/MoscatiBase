import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SearchAutocompleteComponent } from './search.autocomplete.component';
import { SharedModule } from '../../../shared/shared.module';
import { PromocionesService } from '../../../entities/promociones/promociones.service';

@NgModule({
  imports: [SharedModule],
  declarations: [SearchAutocompleteComponent],
  providers: [PromocionesService],
  exports: [SearchAutocompleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchAutocompleteModule {}
