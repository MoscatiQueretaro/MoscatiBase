import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { DetallesMedicoModel, HorariosMedicosModel } from './detalles-medico.model';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesMedicoService } from './detalles-medico.service';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { HttpResponse } from '@angular/common/http';
import { DirectorioMedicoService } from '../../directorio-medico/directorio-medico.service';
import { DirectorioMedicoModel } from '../../directorio-medico/directorio-medico.model';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'jhi-detalles-medico',
  templateUrl: './detalles-medico.component.html',
})
export class DetallesMedicoComponent extends PagingView implements OnInit {
  directorioMedicoList?: DetallesMedicoModel[];
  loading = false;
  especialidadFilter?: EspecialidadesModel;
  horariosMedicos?: HorariosMedicosModel[];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
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

        this.horariosMedicos.forEach(dias => {
          if (dias.dia === 1) {
            dias.diaText = 'calendar.days.monday';
          }
          if (dias.dia === 2) {
            dias.diaText = 'calendar.days.tuesday';
          }
          if (dias.dia === 3) {
            dias.diaText = 'calendar.days.wednesday';
          }
          if (dias.dia === 4) {
            dias.diaText = 'calendar.days.thursday';
          }
          if (dias.dia === 5) {
            dias.diaText = 'calendar.days.friday';
          }
          if (dias.dia === 6) {
            dias.diaText = 'calendar.days.saturday';
          }
          if (dias.dia === 7) {
            dias.diaText = 'calendar.days.sunday';
          }
        });
      }
    });
  }
}
