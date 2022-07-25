import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { JhiEventManager } from 'ng-jhipster';
import { FileModel } from './file.model';
import { DropAreaTemplate } from './drop-area-template.component';
import { FileActionsService } from './file-actions.service';
import { SyncFilesService } from './sync-files.service';
import { ConfirmDialogService } from './ConfirmDialog';

@Component({
  selector: 'jhi-file-drop-area-custom',
  templateUrl: './drop-area-template-custom.component.html',
})
export class FileDropAreaCustomComponent extends DropAreaTemplate<FileModel> implements OnInit, OnDestroy {
  archivos: FileModel[] = [];

  constructor(
    protected sanitizer: DomSanitizer,
    protected eventManager: JhiEventManager,
    protected changeDetector: ChangeDetectorRef,
    protected actionsService: FileActionsService,
    private archivosService: SyncFilesService,
    private confirmDialogService: ConfirmDialogService // private dialogService: DocumentPopupService,
  ) // private webcamDialogService: WebcamDialogService,
  {
    super(sanitizer, eventManager, changeDetector, actionsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  /* eslint-disable */
  ngOnDestroy(): void {
    // if (this.changesSaved) {
    //   if (this.archivosDeletedId && this.archivosDeletedId.length > 0) {
    //     const p = this.archivosDeletedId.map((id) => this.archivosService.delete(this.endpoint, id).toPromise());
    //     Promise.all(p).then(() => {
    //     });
    //   }
    // }
    if (!this.changesSaved) {
      if (this.archivosUploadedId && this.archivosUploadedId.length > 0) {
        const p = this.archivosUploadedId.map(id => this.archivosService.delete(this.endpoint, id).toPromise());
        Promise.all(p).then(() => {});
      }
    }
  }

  processHandledFile(event: any, file: File): void {
    const base64Data = event.target.result.substr(event.target.result.indexOf('base64,') + 'base64,'.length);
    const archivo = new FileModel();
    archivo.nombre = file.name;
    archivo.archivoContentType = file.type;
    archivo.archivo = base64Data;
    this.uploadFile(archivo);
  }

  uploadFile(archivo: FileModel): void {
    archivo = this.beforeUpload(archivo);
    this.archivosService.create(this.endpoint, archivo).subscribe(
      (res: HttpResponse<FileModel>) => this.afterUpload(res, archivo.nombre!),
      () => this.uploadError(archivo.nombre!)
    );
  }

  uploadMultipart(file: File): void {
    let archivo = new FileModel();
    archivo.nombre = file.name;
    archivo.archivoContentType = file.type;
    archivo = this.beforeUpload(archivo);
    this.archivosService.createMultipart(this.endpoint, file, archivo.nombre!).subscribe(
      (res: HttpResponse<FileModel>) => this.afterUpload(res, archivo.nombre!),
      () => this.uploadError(archivo.nombre!)
    );
  }

  //  tomarFoto(): void {
  //     this.webcamDialogService.open(this.maxFiles).then(value => {
  //         value.forEach((file) => {
  //             if (!this.archivos) {
  //                 this.archivos = [];
  //             }
  //             file.nombre = 'Foto - ' + this.archivos.length;
  //             this.uploadFile(file);
  //         });
  //     }).catch(() => {})
  // }

  syncFiles(): void {
    if (this.archivosId) {
      this.archivosId.forEach(archivo => {
        if (!this.archivos) {
          this.archivos = [];
        }
        if (this.archivos.findIndex(el => el.id === archivo) < 0) {
          const newFileToDownload: FileModel = new FileModel();
          newFileToDownload.id = archivo;
          newFileToDownload.loading = true;
          let index = this.archivos.push(newFileToDownload);
          index = index - 1;
          this.archivosService.find(this.endpoint, archivo).subscribe((res: HttpResponse<FileModel>) => {
            const file = res.body;
            if (file && file.id && this.archivos) {
              this.archivos[index] = file;
            }
          });
        }
      });
    }
  }

  // escanearArchivo(): void {
  //     this.loadingFromScanner = true;
  //     this.actionsService.openScanner().subscribe((res) => {
  //         if (res) {
  //             res.forEach(file => {
  //                 this.uploadFile(file);
  //             });
  //         }
  //         this.loadingFromScanner = false;
  //     }, () => this.loadingFromScanner = false);
  // }

  agregaArchivo(): void {
    this.webcamFile = false;
    this.addFile = true;
    this.agregarArchivo();
  }
  // tomaFoto():void {
  //     this.addFile = false;
  //     this.webcamFile = true;
  //     this.tomarFoto();
  // }
}
