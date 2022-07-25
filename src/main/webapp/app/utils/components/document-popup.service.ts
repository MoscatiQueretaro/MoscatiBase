import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FileModel } from './file.model';
import { PhotoComponent } from './photo.component';

export type ModalType = NgbModalRef<typeof PhotoComponent>;

@Injectable()
export class DocumentPopupService {
  private modalRef?: ModalType | null;

  constructor(private datePipe: DatePipe, private modalService: NgbModal) {}

  openPhoto(archivo?: FileModel, endpoint?: string): Promise<ModalType> {
    return new Promise<ModalType>(resolve => {
      if (this.modalRef) {
        resolve(this.modalRef);
      }
      if (archivo) {
        this.modalRef = this.photoModalRef(archivo, endpoint);
        resolve(this.modalRef);
      } else {
        this.modalRef = this.photoModalRef(undefined);
        resolve(this.modalRef);
      }
    });
  }

  /* eslint-disable */
  photoModalRef(archivo: FileModel | undefined, endpoint?: string): NgbModalRef {
    const modal = this.modalService.open(PhotoComponent, {
      size: 'lg',
      backdrop: 'static',
      windowClass: 'photo-modal nonScroll',
    });
    modal.componentInstance.archivo = archivo || undefined;
    modal.componentInstance.endpoint = endpoint || undefined;
    this.modalRef = modal;
    modal.result.then(
      () => {
        this.modalRef = null;
      },
      () => {
        this.modalRef = null;
      }
    );
    return modal;
  }
}
