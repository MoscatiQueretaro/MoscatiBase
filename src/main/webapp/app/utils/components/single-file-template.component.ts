import { Component, EventEmitter, Input, Output } from '@angular/core';
import { audioTypes, FileActionsService, imageTypes, PDF, videoTypes } from './file-actions.service';

@Component({
  selector: 'jhi-single-file-template',
  templateUrl: './single-file-template.component.html',
})
export class SingleFileTemplateComponent {
  @Input()
  borderImageType?: string;

  @Input()
  endpoint = 'file';
  _size?: number;
  imageStyle?: any;
  buttonsStyle: any;

  @Input()
  file?: any;

  /* eslint-disable */
  @Input()
  set imageStyleProfile(value: any) {
    if (value !== this.imageStyle) {
      this.imageStyle = value;
      console.warn('image style', this.imageStyle);
    }
  }

  @Input()
  showName = true;

  @Input()
  view = true;

  @Input()
  delete = true;

  @Input()
  download = true;

  @Output()
  removePress = new EventEmitter<any>();

  constructor(protected actionsService: FileActionsService) {}

  isImage(): string {
    const index = imageTypes.indexOf(this.file.archivoContentType || '');
    if (index < 0) {
      return 'image-file';
    } else {
      return 'image-photo';
    }
  }

  getImage(): any {
    return this.actionsService.getImage(this.file);
  }

  showViewButton(): boolean {
    let index = imageTypes.indexOf(this.file.archivoContentType || '');
    if (index >= 0) {
      return true;
    }
    index = videoTypes.indexOf(this.file.archivoContentType || '');
    if (index >= 0) {
      return true;
    }
    index = audioTypes.indexOf(this.file.archivoContentType || '');
    if (index >= 0) {
      return true;
    }
    if (this.file.archivoContentType === PDF) {
      return true;
    }
    return false;
  }

  removeFile(): void {
    this.removePress.emit(undefined);
  }

  downloadFile(): void {
    this.actionsService.downloadFileByUrlDirect(this.endpoint, this.file.id);
  }

  verArchivo(): void {
    this.actionsService.openFileByUrl(this.endpoint, this.file.id).subscribe();
    // this.actionsService.printFileByModel(this.file);
  }
}
