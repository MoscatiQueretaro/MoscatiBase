import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReagendarCitaFormComponent } from './reagendar-cita-form.component';
import { UserCitasModel } from '../user-citas.model';

type ModalType = NgbModalRef<typeof ReagendarCitaFormComponent>;

@Injectable()
export class ReagendarCitaPopupService {
  private modalRef?: ModalType | null;

  constructor(private modalService: NgbModal) {}

  open(cita?: UserCitasModel): Promise<NgbModalRef<typeof ReagendarCitaFormComponent>> {
    return new Promise<NgbModalRef<typeof ReagendarCitaFormComponent>>(resolve => {
      if (this.modalRef) {
        resolve(this.modalRef);
      }
      if (cita) {
        resolve(this.popupRef(cita));
      }
    });
  }

  private popupRef(cita?: UserCitasModel): NgbModalRef<typeof ReagendarCitaFormComponent> {
    const modal = this.modalService.open<typeof ReagendarCitaFormComponent>(ReagendarCitaFormComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modal.componentInstance.cita = cita;
    this.modalRef = modal;
    modal.result.then(
      () => (this.modalRef = undefined),
      () => (this.modalRef = undefined)
    );
    return modal;
  }
}
