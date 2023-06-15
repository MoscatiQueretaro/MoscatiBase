import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { FileModel } from '../../../utils/components/file.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PromocionesModel } from '../promociones.model';
import { PhotoUserAlbumModel } from '../../user-profile/new-profile-image/photo-user-album.model';
import { PromocionesService } from '../promociones.service';
import { AccountService } from '../../../core/auth/account.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TipoPromocionModel } from '../../catalogos/tipo-promocion/tipo-promocion.model';

@Component({
  selector: 'jhi-add-promotion',
  templateUrl: './agregar-promocion.component.html',
})
export class AgregarPromocionComponent implements OnInit {
  promocion?: PromocionesModel;
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
    descuento: [0, [Validators.max(99), Validators.pattern('[0-9]*')]],
    vigencia: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50000)]],
  });

  constructor(
    private promocionesService: PromocionesService,
    private eventManager: JhiEventManager,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.eventManager.subscribe('agregar-promocion-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.promocion = new PromocionesModel();
    this.accountService.identity(true).subscribe((account: MoscatiUserModel | null) => {
      if (account) {
        this.promocion!.autor = account;
      }
    });

    if (!this.entity) {
      this.entity = new PhotoUserAlbumModel();
    }
    this.defaultDateTime = new Date(
      this.now.getFullYear().toString() + '-0' + (this.now.getMonth() + 1).toString() + '-' + this.now.getDate().toString()
    );
    this.fileFoto = [];
  }
  getFiles(files: any): void {
    this.promocion!.foto = new FileModel(files[0], '', '', '', true);
  }

  typeOfAdvertising(): void {
    this.detailedAdvertising = !this.detailedAdvertising;
    if (this.detailedAdvertising) {
      this.promocion!.tipo = new TipoPromocionModel(2, 'PROMOCION_DETALLADA');
    } else {
      this.promocion!.tipo = new TipoPromocionModel(1, 'PROMOCION_NORMAL');
    }
  }

  save(): void {
    this.promocion!.descripcion = this.insertLineBreaks(this.promocion!.descripcion!);
    alert(this.promocion!.descripcion);
    this.subscribeToSaveResponse(this.promocionesService.create(this.promocion!));
  }

  insertLineBreaks(val: string): string {
    let res = val.replace(/[\r\n]/g, '<br>'); // remplaza saltos de linea convencionales por <br>
    res = res.replace(/(?<!<br>)((<\/p>)|(<\/li>))/g, '<br>$1'); // inserta un salto de linea al final en cada </li> o </p>
    res = res.replace(/language-markup/g, ''); // elimina la clase para evitar concatenación al editar
    res = res.replace(/(<pre)(.*?class="([^"]*?)")?(.*?="[^"]*?")*?>/g, '$1 class="$3 language-markup">'); // agrega clase "language-markup" a los pre
    return res;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<PromocionesModel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.savedPhotho = true;
    this.fileFoto = [];
    this.eventManager.broadcast('user-profile-reload');
  }

  protected onSaveError(): void {
    console.warn('error al guardar');
    this.savedPhotho = false;
  }
}
