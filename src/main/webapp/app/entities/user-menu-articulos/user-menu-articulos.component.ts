import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';
import { UserMenuArticulosModel } from './user-menu-articulos.model';
import { UserMenuArticulosService } from './user-menu-articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingView } from '../../utils/pagination/PagingView';
import { AgregarArticuloPopupService } from './agregar-menu-articulo/agregar-articulo-popup.service';

@Component({
  selector: 'jhi-user-menu-articulos-list',
  templateUrl: './user-menu-articulos.component.html',
})
export class UserMenuArticulosComponent extends PagingView implements OnInit {
  menuArticulosList?: UserMenuArticulosModel[];
  loading = false;
  @Input()
  userId?: number;
  nombreFilter?: string;
  descripcionFilter?: string;
  autorFilter?: string;

  constructor(
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    private syncFileService: SyncFilesService,
    private userMenuArticulosService: UserMenuArticulosService,
    private agregarArticuloPopupService: AgregarArticuloPopupService
  ) {
    super(router, activatedRoute, eventManager, 'descripcion');

    this.eventManager.subscribe('user-menu-articulos-list-reload', () => {
      this.ngOnInit();
    });
  }

  applyFilters(): void {
    this.previousPage = undefined;
    this.page = 1;

    if (this.nombreFilter !== undefined && this.nombreFilter !== '') {
      this.filters['nombre.contains'] = this.nombreFilter;
    } else {
      delete this.filters['nombre.equals'];
    }

    if (this.descripcionFilter !== undefined && this.descripcionFilter !== '') {
      this.filters['descripcion.contains'] = this.descripcionFilter;
    } else {
      delete this.filters['descripcion.equals'];
    }

    if (this.autorFilter !== undefined) {
      this.filters['autor.contains'] = this.autorFilter;
    } else {
      delete this.filters['autor.equals'];
    }

    this.transition();
  }

  ngOnInit(): void {
    this.applyFilters();
    this.loadMenuArticulos();
  }

  loadMenuArticulos(): void {
    this.loading = true;
    this.userMenuArticulosService.query(this.getParams()).subscribe(
      (res: HttpResponse<UserMenuArticulosModel[]>) => {
        if (res.body) {
          this.menuArticulosList = res.body;
          this.loading = false;
        }
      },
      () => (this.loading = false)
    );
  }

  updateArticulo(articulo: UserMenuArticulosModel): void {
    this.agregarArticuloPopupService.open(articulo.id);
  }
  createArticulo(): void {
    this.agregarArticuloPopupService.open();
  }
}
