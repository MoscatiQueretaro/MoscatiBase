import { Component, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { AutocompleteAnimations, AutocompleteComponent } from 'app/utils/autocomplete/autocomplete.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'app/utils/dom/domhandler';
import { HttpResponse } from '@angular/common/http';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';
import { EspecialidadesService } from '../../catalogos/especialidades/especialidades.service';

@Component({
  selector: 'jhi-especialidades-autocomplete',
  templateUrl: '../../../utils/autocomplete/autocomplete.component.html',
  styleUrls: ['../../../utils/autocomplete/autocomplete.component.scss'],
  animations: AutocompleteAnimations,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EspecialidadesAutocompleteComponent),
    },
  ],
})
export class EspecialidadesAutocompleteComponent extends AutocompleteComponent<EspecialidadesModel> implements OnInit {
  minLength = 2;
  field = 'descripcion';

  constructor(protected renderer: Renderer2, protected domHandler: DomHandler, private service: EspecialidadesService) {
    super(renderer, domHandler);
  }

  ngOnInit(): void {
    this._loading = false;
    this.service.query().subscribe(
      (res: HttpResponse<EspecialidadesModel[]>) => {
        if (res.body) {
          const temp = res.body;

          const todas = new EspecialidadesModel();
          temp.unshift(todas);
          this.principalArray = temp;
        }
        this._loading = false;
      },
      () => (this._loading = false)
    );
  }
}
