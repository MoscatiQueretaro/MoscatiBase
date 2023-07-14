import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgregarArticuloComponent } from './agregar-articulo.component';
import { UserMenuArticulosModel } from '../user-menu-articulos.model';
import { UserMenuArticulosService } from '../user-menu-articulos.service';
import { HttpResponse } from '@angular/common/http';

type ModalType = NgbModalRef<typeof AgregarArticuloComponent>;

@Injectable()
export class AgregarArticuloPopupService {
  private modalRef?: ModalType | null;

  constructor(private modalService: NgbModal, private entityService: UserMenuArticulosService) {}

  open(articuloId?: number): Promise<NgbModalRef<typeof AgregarArticuloComponent>> {
    return new Promise<NgbModalRef<typeof AgregarArticuloComponent>>(resolve => {
      if (this.modalRef) {
        resolve(this.modalRef);
      }
      if (articuloId !== undefined) {
        this.entityService.find(articuloId).subscribe((res: HttpResponse<UserMenuArticulosModel>) => resolve(this.popupRef(res.body)));
      } else {
        resolve(this.popupRef(new UserMenuArticulosModel()));
      }
    });
  }

  private popupRef(articulo: UserMenuArticulosModel | null): NgbModalRef<typeof AgregarArticuloComponent> {
    const modal = this.modalService.open<typeof AgregarArticuloComponent>(AgregarArticuloComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modal.componentInstance.articulo = articulo ?? undefined;
    this.modalRef = modal;
    modal.result.then(
      () => (this.modalRef = undefined),
      () => (this.modalRef = undefined)
    );
    return modal;
  }
}
