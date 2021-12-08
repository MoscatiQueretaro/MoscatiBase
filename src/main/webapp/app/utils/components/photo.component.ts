import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SERVER_API_URL } from 'app/app.constants';
import { FileModel } from './file.model';
import { audioTypes, FileActionsService, imageTypes, videoTypes } from './file-actions.service';
// import {Track} from 'ngx-audio-player';

@Component({
  selector: 'jhi-photo-component',
  templateUrl: './photo.component.html',
  styleUrls: ['./style.scss'],
})
export class PhotoComponent implements OnInit {
  archivo?: FileModel;
  endpoint?: string;
  // playList: Track[] = [];

  constructor(private sanitizer: DomSanitizer, public activeModal: NgbActiveModal, public fileActionsService: FileActionsService) {}

  ngOnInit(): void {
    if (this.endpoint) {
      console.warn(SERVER_API_URL + this.endpoint);
    }
    /*  if (this.isAudio()) {
            this.initPlayList();
        }*/
  }

  /* eslint-disable */
  getValue(): SafeResourceUrl | null {
    if (this.archivo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.archivo.archivoContentType + ';base64,' + this.archivo.archivo);
    }
    return null;
  }

  clear(): void {
    this.activeModal.close('cancel');
  }
  /* eslint-disable */
  getName(): string {
    if (this.archivo) {
      if (this.archivo.nombre) {
        if (this.archivo.nombre.split('.').length > 1) {
          return this.archivo.nombre;
        }
        return this.archivo.nombre + '.' + this.fileActionsService.getExtension(this.archivo);
      }
      return new Date().getTime() + '.' + this.fileActionsService.getExtension(this.archivo);
    }
    return new Date().getTime() + '';
  }

  download(): void {
    if (this.archivo && this.endpoint) {
      this.fileActionsService.downloadFileByUrlDirect(this.endpoint, this.archivo.id);
    }
  }

  isImage(): boolean {
    const index = imageTypes.indexOf(this.archivo!.archivoContentType!);
    return index >= 0;
  }

  isVideo(): boolean {
    const index = videoTypes.indexOf(this.archivo!.archivoContentType!);
    return index >= 0;
  }

  isAudio(): boolean {
    const index = audioTypes.indexOf(this.archivo!.archivoContentType!);
    return index >= 0;
  }

  getUrlToFile(): string {
    return `${SERVER_API_URL}public/${this.endpoint}/${this.archivo!.id}`;
  }

  /* initPlayList(): void {
        this.playList = [];
        const track = new Track();
        track.link = this.getUrlToFile();
        this.playList.push(track);
    }*/

  getImage(): any {
    return this.fileActionsService.getImage(this.archivo!);
  }
}
