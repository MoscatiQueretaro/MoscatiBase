import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { FileModel } from '../../../utils/components/file.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PhotoUserAlbumModel } from '../../user-profile/new-profile-image/photo-user-album.model';
import { AccountService } from '../../../core/auth/account.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserMenuArticulosModel } from '../user-menu-articulos.model';
import { UserMenuArticulosService } from '../user-menu-articulos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
})
export class AgregarArticuloComponent implements OnInit {
  articulo?: UserMenuArticulosModel;
  fileModel?: FileModel;
  userAccount?: MoscatiUserModel;
  entity?: PhotoUserAlbumModel;
  defaultDateTime?: Date;
  now = new Date();
  detailedAdvertising = false;
  error = false;
  loading = false;
  fileFoto?: string[];
  fotografia = '';
  optionButton = 1;
  success = false;
  savedPhotho = false;

  promocionesForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
    precio: [0, [Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]],
    descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50000)]],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private promocionesService: UserMenuArticulosService,
    private eventManager: JhiEventManager,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.articulo === undefined) {
      this.articulo = new UserMenuArticulosModel();
      this.accountService.identity(true).subscribe((account: MoscatiUserModel | null) => {
        if (account) {
          this.articulo!.autor = account;
        }
      });

      if (!this.entity) {
        this.entity = new PhotoUserAlbumModel();
      }
      this.defaultDateTime = new Date(
        this.now.getFullYear().toString() + '-0' + (this.now.getMonth() + 1).toString() + '-' + this.now.getDate().toString()
      );
      this.fileFoto = [];
    } else {
      this.fileFoto = [];
      this.fileFoto.push(this.articulo.foto!.id);
    }
  }
  getFiles(files: any): void {
    this.articulo!.foto = new FileModel(files[0], '', '', '', true);
  }

  save(): void {
    this.subscribeToSaveResponse(this.promocionesService.update(this.articulo!));
  }

  clear(): void {
    this.activeModal.close();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<UserMenuArticulosModel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.savedPhotho = true;
    this.fileFoto = [];
    this.eventManager.broadcast('user-menu-articulos-list-reload');
  }

  protected onSaveError(): void {
    console.warn('error al guardar');
    this.savedPhotho = false;
  }
}
