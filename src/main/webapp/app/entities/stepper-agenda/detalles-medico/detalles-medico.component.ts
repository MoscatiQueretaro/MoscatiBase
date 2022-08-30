import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { DetallesMedicoModel, HorariosMedicosModel } from './detalles-medico.model';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesMedicoService } from './detalles-medico.service';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { HttpResponse } from '@angular/common/http';
import { UserCitasModel } from '../../citas/user-citas.model';
import { DirectorioMedicoService } from '../../directorio-medico/directorio-medico.service';
import { DirectorioMedicoModel } from '../../directorio-medico/directorio-medico.model';

@Component({
  selector: 'jhi-detalles-medico',
  templateUrl: './detalles-medico.component.html',
})
export class DetallesMedicoComponent extends PagingView implements OnInit {
  directorioMedicoList?: DetallesMedicoModel[];
  loading = false;
  especialidadFilter?: EspecialidadesModel;
  horariosMedicos?: HorariosMedicosModel[];
  @Input()
  doctor?: MoscatiUserModel;

  @Input()
  directorioMedico?: DirectorioMedicoModel;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: DetallesMedicoService,
    protected directorioMedicoService: DirectorioMedicoService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-details-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.doctor) {
      this.loadDoctorDetails();
    }
  }

  loadDoctorDetails(): void {
    this.service.findAllHorariosById(this.doctor!.id!).subscribe((res: HttpResponse<HorariosMedicosModel[] | null>) => {
      if (res.body) {
        this.horariosMedicos = res.body;
        console.warn('horarios med:', this.horariosMedicos);
      }
    });
  }
}
