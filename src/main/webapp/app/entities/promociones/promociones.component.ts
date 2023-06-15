import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { PromocionesService } from './promociones.service';
import { PromocionesModel } from './promociones.model';

@Component({
  selector: 'jhi-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.styles.scss'],
})
export class PromocionesComponent extends PagingView implements OnInit {
  promocionesList?: PromocionesModel[];
  loading = true;
  userAccount?: MoscatiUserModel;
  nombreFilter?: string;
  descripcionFilter?: string;
  autorFilter?: string;
  @Input()
  busqueda?: string;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: PromocionesService,
    private accountService: AccountService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'nombre');
    this.paramsParser();
    this.eventManager.subscribe('promociones-reload', () => {
      this.ngOnInit();
    });
  }

  paramsParser(): void {
    if (this.filters['nombre.contains']) {
      this.nombreFilter = this.filters['nombre.contains'];
    }

    if (this.filters['descripcion.contains']) {
      this.descripcionFilter = this.filters['descripcion.contains'];
    }

    if (this.filters['autor.contains']) {
      this.autorFilter = this.filters['autor.contains'];
    }
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.nombreFilter = this.descripcionFilter = this.autorFilter = params['busqueda'];
    });
    this.applyFilters();
    this.loadAll();
  }

  loadAll(): void {
    this.service.query(this.getParams()).subscribe(
      (res: HttpResponse<PromocionesModel[] | null>) => {
        if (res.body) {
          this.promocionesList = res.body;
        }
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  replaceHtmlContent(promocion: PromocionesModel): void {
    const promoreplace = document.getElementById(promocion.id!.toString());
    if (promoreplace && promocion.descripcion) {
      promoreplace.innerHTML = `${promocion.descripcion}`;
    }
  }
}
