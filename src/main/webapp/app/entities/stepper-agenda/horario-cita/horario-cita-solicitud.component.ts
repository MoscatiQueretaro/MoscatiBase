import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { HorarioCitaModel, HorariosDisponiblesModel } from './horario-cita.model';
import { PagingView } from '../../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioCitaService } from './horario-cita.service';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { CatalogoModel } from '../../catalogos/catalogo.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-horario-solicitud',
  templateUrl: './horario-cita-solicitud.component.html',
})
export class HorarioCitaSolicitudComponent extends PagingView implements OnInit {
  horarioCitaSolicitud?: HorarioCitaModel;
  horariosList?: HorariosDisponiblesModel[];
  loading = false;
  fechaHora?: string | Date;
  defaultDateTime?: Date;
  now = new Date();

  @Input()
  doctormodel?: MoscatiUserModel;

  @Input()
  userModel?: MoscatiUserModel;

  @Output() horarySelect = new EventEmitter<boolean>();

  @Output() resumenCita = new EventEmitter<HorarioCitaModel>();

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: HorarioCitaService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-details-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.horarioCitaSolicitud = new HorarioCitaModel();
    if (this.doctormodel && this.userModel) {
      this.horarioCitaSolicitud.doctor = this.doctormodel;
      this.horarioCitaSolicitud.user = this.userModel;
      this.horarioCitaSolicitud.tipoCita = new CatalogoModel(1, 'VIRTUAL');
      this.horarioCitaSolicitud.etapaCita = new CatalogoModel(1, 'SOLICITUD');
    }
    this.defaultDateTime = new Date(
      this.now.getFullYear().toString() +
        '-0' +
        (this.now.getMonth() + 1).toString() +
        '-' +
        this.now.getDate().toString() +
        ' ' +
        (this.now.getHours() < 10 ? '0' + this.now.getHours().toString() : this.now.getHours().toString()) +
        ':' +
        '00:00.000'
    );
  }

  consultarDisponibilidad(): void {
    if (this.fechaHora) {
      const fecha = new Date(this.fechaHora);
      const fechaformat =
        fecha.getFullYear().toString() +
        '-0' +
        (fecha.getMonth() + 1).toString() +
        '-' +
        fecha.getDate().toString() +
        ' ' +
        (fecha.getHours() < 10 ? '0' + fecha.getHours().toString() : fecha.getHours().toString()) +
        ':' +
        (fecha.getMinutes() < 10 ? '0' + fecha.getMinutes().toString() : fecha.getMinutes().toString()) +
        ':00.000';
      this.horarioCitaSolicitud!.fechaHoraSolicitud = fechaformat;

      this.loading = true;
      this.service.findAllHorariosDisponibles(this.horarioCitaSolicitud!).subscribe(
        (res: HttpResponse<HorariosDisponiblesModel[] | null>) => {
          if (res.body) {
            this.horariosList = res.body;
            if (this.horariosList.length > 0) {
              this.horarySelect.emit(true);
            } else {
              this.horarySelect.emit(false);
              this.resumenCita.emit(this.horarioCitaSolicitud);
            }
          }
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
