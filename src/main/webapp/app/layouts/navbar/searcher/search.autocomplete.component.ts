import { Component, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { AutocompleteAnimations, AutocompleteComponent } from 'app/utils/autocomplete/autocomplete.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'app/utils/dom/domhandler';
import { HttpResponse } from '@angular/common/http';
import { PromocionesModel } from '../../../entities/promociones/promociones.model';
import { PromocionesService } from '../../../entities/promociones/promociones.service';

@Component({
  selector: 'jhi-search-autocomplete',
  templateUrl: '../../../utils/autocomplete/autocomplete.component.html',
  styleUrls: ['../../../utils/autocomplete/autocomplete.component.scss'],
  animations: AutocompleteAnimations,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchAutocompleteComponent),
    },
  ],
})
export class SearchAutocompleteComponent extends AutocompleteComponent<PromocionesModel> implements OnInit {
  minLength = 2;
  field = 'descripcion';

  constructor(protected renderer: Renderer2, protected domHandler: DomHandler, private service: PromocionesService) {
    super(renderer, domHandler);
  }

  ngOnInit(): void {
    this._loading = false;
    this.service.query().subscribe(
      (res: HttpResponse<PromocionesModel[]>) => {
        if (res.body) {
          const temp = res.body;
          const todas = new PromocionesModel();
          temp.unshift(todas);
          this.principalArray = temp;
        }
        this._loading = false;
      },
      () => (this._loading = false)
    );
  }
}
