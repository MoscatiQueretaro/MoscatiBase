import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { DetallesMedicoModel } from './detalles-medico.model';
import { EspecialidadesModel } from '../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesMedicoService } from './detalles-medico.service';

@Component({
  selector: 'jhi-detalles-medico',
  templateUrl: './detalles-medico.component.html',
})
export class DetallesMedicoComponent extends PagingView implements OnInit {
  directorioMedicoList?: DetallesMedicoModel[];
  loading = false;
  especialidadFilter?: EspecialidadesModel;

  @Input()
  doctorId?: number;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: DetallesMedicoService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-details-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.doctorId) {
      this.loadDoctorProfile();
    }
  }

  loadDoctorProfile(): void {}
}
