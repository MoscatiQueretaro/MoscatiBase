import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PhotoUserAlbumModel } from './photo-user-album.model';
import { NewImageProfileService } from './new-image-profile.service';

@Component({
  templateUrl: './new-image-profile-form.component.html',
})
export class NewImageProfileFormComponent implements OnInit {
  idImageProfile?: string;
  userId?: number;
  entity?: PhotoUserAlbumModel;

  savedPhotho = false;
  fileFoto?: string[];
  constructor(
    public activeModal: NgbActiveModal,
    protected newImageProfileService: NewImageProfileService,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    if (!this.entity) {
      this.entity = new PhotoUserAlbumModel();
    }
    this.entity.userId = this.userId;
    this.fileFoto = [];
    if (this.idImageProfile) {
      this.fileFoto.push(this.idImageProfile);
    }
  }

  clear(): void {
    this.activeModal.close();
  }

  /* eslint-disable */
  save(): void {
    if (this.entity && this.entity.fotoPersonaId && this.entity.userId) {
      this.subscribeToSaveResponse(this.newImageProfileService.updatePhotoUser(this.entity));
    }
  }
  getFiles(files: any): void {
    this.entity!.fotoPersonaId = files[0];
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<PhotoUserAlbumModel>>): void {
    console.warn('entra suscribe:', result);
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    console.warn('exito al guardar');
    this.savedPhotho = true;
    this.fileFoto = [];
    this.eventManager.broadcast('user-profile-reload');
  }

  protected onSaveError(): void {
    console.warn('error al guardar');
    this.savedPhotho = false;
  }
} // class
