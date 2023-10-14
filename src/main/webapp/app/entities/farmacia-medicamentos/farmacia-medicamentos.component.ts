import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';
import { FarmaciaMedicamentosModel } from './farmacia-medicamentos.model';
import { FarmaciaMedicamentosService } from './farmacia-medicamentos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingView } from '../../utils/pagination/PagingView';

@Component({
  selector: 'jhi-farmacia-medicamentos-list',
  templateUrl: './farmacia-medicamentos.component.html',
})
export class FarmaciaMedicamentosComponent extends PagingView implements OnInit {
  farmaciaList?: FarmaciaMedicamentosModel[];
  loading = false;

  constructor(
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    private syncFileService: SyncFilesService,
    private medicamentosService: FarmaciaMedicamentosService
  ) {
    super(router, activatedRoute, eventManager, 'descripcion');

    this.eventManager.subscribe('user-menu-articulos-list-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loadMedicamentosList();
  }

  loadMedicamentosList(): void {
    this.loading = true;
    this.medicamentosService.query(this.getParams()).subscribe(
      (res: HttpResponse<FarmaciaMedicamentosModel[]>) => {
        if (res.body) {
          this.farmaciaList = res.body;
          this.loading = false;
        }
      },
      () => (this.loading = false)
    );
  }

  // updateArticulo(articulo: FarmaciaMedicamentosModel): void {
  //   this.agregarArticuloPopupService.open(articulo.id);
  // }
  // createArticulo(): void {
  //   this.agregarArticuloPopupService.open();
  // }
}
