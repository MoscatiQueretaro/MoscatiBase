import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewImageProfileFormComponent } from './new-image-profile-form.component';

type ModalType = NgbModalRef<typeof NewImageProfileFormComponent>;

@Injectable()
export class NewImageProfilePopupService {
  private modalRef?: ModalType | null;

  constructor(private modalService: NgbModal) {}

  open(id?: string, userId?: number): Promise<NgbModalRef<typeof NewImageProfileFormComponent>> {
    return new Promise<NgbModalRef<typeof NewImageProfileFormComponent>>(resolve => {
      if (this.modalRef) {
        resolve(this.modalRef);
      }
      if (userId) {
        resolve(this.popupRef(id, userId));
      }
    });
  }

  private popupRef(idImage?: string, userId?: number): NgbModalRef<typeof NewImageProfileFormComponent> {
    const modal = this.modalService.open<typeof NewImageProfileFormComponent>(NewImageProfileFormComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modal.componentInstance.idImageProfile = idImage;
    modal.componentInstance.userId = userId;
    this.modalRef = modal;
    modal.result.then(
      () => (this.modalRef = undefined),
      () => (this.modalRef = undefined)
    );
    return modal;
  }
}
