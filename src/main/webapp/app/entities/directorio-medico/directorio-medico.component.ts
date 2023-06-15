import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { DirectorioMedicoModel } from './directorio-medico.model';
import { EspecialidadesModel } from '../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DirectorioMedicoService } from './directorio-medico.service';

@Component({
  selector: 'jhi-directorio-medico',
  templateUrl: './directorio-medico.component.html',
})
export class DirectorioMedicoComponent extends PagingView implements OnInit {
  directorioMedicoList?: DirectorioMedicoModel[];
  loading = false;
  especialidadFilter?: EspecialidadesModel;
  @Output() doctorSelect = new EventEmitter<DirectorioMedicoModel>();
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: DirectorioMedicoService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-directory-reload', () => {
      this.ngOnInit();
    });
  }

  applyFilters(): void {
    this.previousPage = undefined;
    this.page = 1;

    if (this.especialidadFilter !== undefined && this.especialidadFilter !== '') {
      this.filters['especialidad.contains'] = this.especialidadFilter.descripcion;
    } else {
      delete this.filters['especialidad.contains'];
    }
    this.transition();
  }

  ngOnInit(): void {
    if (this.filters['especialidad.contains']) {
      this.loadAll();
    }
  }

  loadAll(): void {
    this.loading = true;
    this.service.query(this.getParams()).subscribe(
      (res: HttpResponse<DirectorioMedicoModel[] | null>) => {
        if (res.body) {
          this.directorioMedicoList = res.body;
        }
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  seleccionarMedico(doctor: DirectorioMedicoModel): void {
    this.doctorSelect.emit(doctor);
  }
}
