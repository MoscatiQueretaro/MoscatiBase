import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserCitasModel } from '../user-citas.model';
import { UserCitasService } from '../user-citas.service';

@Component({
  templateUrl: './reagendar-cita-form.component.html',
})
export class ReagendarCitaFormComponent implements OnInit {
  cita?: UserCitasModel;
  userId?: number;
  resumenCita?: UserCitasModel;
  horarioDisponible = true;
  savedCita = false;
  fileFoto?: string[];
  constructor(public activeModal: NgbActiveModal, protected citasService: UserCitasService, protected eventManager: JhiEventManager) {}

  ngOnInit(): void {
    if (!this.cita) {
      this.cita = new UserCitasModel();
    }
  }

  clear(): void {
    this.activeModal.close();
  }

  getEnabledHorary(disponibilidad: boolean): void {
    this.horarioDisponible = disponibilidad;
  }
  getResumenCita(resume: UserCitasModel): void {
    this.resumenCita = resume;
  }

  /* eslint-disable */
  save(): void {
    if (this.cita && this.cita.fechaHoraSolicitud) {
      this.subscribeToSaveResponse(this.citasService.update(this.cita));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<UserCitasModel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.savedCita = true;
    this.fileFoto = [];
    this.eventManager.broadcast('user-profile-reload');
  }

  protected onSaveError(): void {
    console.warn('error al guardar');
    this.savedCita = false;
  }
} // class
