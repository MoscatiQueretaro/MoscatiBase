import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { JhiEventManager } from 'ng-jhipster';

import { HttpResponse } from '@angular/common/http';
import { FileModel } from './file.model';
import { audioTypes, excelTypes, FileActionsService, imageTypes, PDF, pptxTypes, videoTypes, wordTypes } from './file-actions.service';

@Directive()
export class DropAreaTemplate<X extends FileModel> implements OnInit, OnDestroy {
  @ViewChild('inputFile', { static: false }) inputFile?: ElementRef;
  _endpoint = 'file';

  archivos: X[] = [];
  archivosId: string[] = [];
  archivosDeletedId: string[] = [];
  archivosUploadedId: string[] = [];

  dragging = false;
  loading = false;
  loadingFromScanner = false;
  types: string[] = [];
  typesString?: string;
  _changes = false;
  changesSaved = false;

  /**
   * DETERMINA EL TAMAÑO MAXIMO DE LOS ARCHIVOS A SUBIR
   */
  _maxFileSize = 20;

  /**
   * DETERMINA LA CANTIDAD MAXIMA DE ARCHIVOS A SUBIR
   */
  _maxFiles?: number;

  /**
   * PERMITE AGREGAR IMAGENES
   */
  _images = false;

  /**
   * PERMITE AGREGAR VIDEOS
   */
  _videos = false;

  /**
   * PERMITE AGREGAR PDF
   */
  _pdf = false;

  /**
   * PERMITE AGREGAR HOJAS DE CALCULO
   */
  _excel = false;

  /**
   * PERMITE AGREGAR DOCUMENTOS
   */
  _word = false;

  /**
   * PERMITE AGREGAR PRESENTACIONES
   */
  _ppt = false;

  /**
   * PERMITE AGREGAR AUDIO
   */
  _audio = false;

  /**
   * PERMITE MOSTRAR BOTON DE AGREGAR
   */
  _addFile = false;

  /**
   * OCULTAR NOMBRE DE ARCHIVO
   */
  _hideName = false;

  /**
   * MOSTRAR BOTON DE WEBCAM
   */
  _webcamFile = false;

  /**
   * MOSTRAR BOTON DE VER
   */
  _view = false;

  /**
   * MOSTRAR BOTON DE ESCANER
   */
  _scanFile = false;

  /**
   * MOSTRAR BOTON DE ELIMINAR
   */
  _delete = false;

  /**
   * MOSTRAR BOTON DE DESCARGAR
   */
  _download = false;

  /**
   * MOSTRAR BOTON DE WEBCAM
   */

  @Input()
  borderImage?: string;

  @Input()
  imageStyle?: any;

  @Input()
  classContainer = undefined;

  @Output() filesIdChange = new EventEmitter<string[]>();

  @Output() archivosChange = new EventEmitter<X[]>();

  @Input()
  set saved(val: boolean) {
    this.changesSaved = val;
  }
  /* eslint-disable */
  @Input()
  set filesId(value: string[]) {
    if (value) {
      if (value !== this.archivosId) {
        this.archivosId = value;
        setTimeout(() => {
          this.syncFiles();
        }, 100);
      }
    }
  }

  @Input()
  get files(): X[] {
    if (!this.archivos) {
      this.archivos = [];
    }
    return this.archivos;
  }

  set files(files: X[]) {
    if (files) {
      this.archivos = files;
    }
  }

  @Input()
  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }

  @Input()
  get hideName(): boolean {
    return this._hideName;
  }

  set hideName(value: boolean) {
    this._hideName = value;
  }

  @Input()
  get maxFileSize(): number {
    return this._maxFileSize;
  }

  set maxFileSize(maxFileSize: number) {
    this._maxFileSize = maxFileSize;
  }

  @Input()
  get maxFiles(): number | undefined {
    return this._maxFiles;
  }

  set maxFiles(maxFiles: number | undefined) {
    this._maxFiles = maxFiles;
  }

  @Input()
  get images(): boolean {
    return this._images;
  }

  set images(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._images = types;
    if (this._images) {
      imageTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
        this.changeDetector.detectChanges();
      });
    }
  }

  @Input()
  get videos(): boolean {
    return this._videos;
  }

  set videos(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._videos = types;
    if (this._videos) {
      videoTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
        this.changeDetector.detectChanges();
      });
    }
  }

  @Input()
  get pdf(): boolean {
    return this._pdf;
  }

  set pdf(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._pdf = types;
    if (this._pdf) {
      this.types.push(PDF);
      this.typesString += PDF + ',';
    }
  }

  @Input()
  get word(): boolean {
    return this._word;
  }

  set word(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._word = types;
    if (this._word) {
      wordTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
      });
    }
  }

  @Input()
  get excel(): boolean {
    return this._excel;
  }

  set excel(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._excel = types;
    if (this._excel) {
      excelTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
      });
    }
  }

  @Input()
  get ppt(): boolean {
    return this._images;
  }

  set ppt(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._ppt = types;
    if (this._ppt) {
      pptxTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
      });
    }
  }

  @Input()
  get audio(): boolean {
    return this._audio;
  }

  set audio(types: boolean) {
    if (!this.typesString) {
      this.typesString = '';
    }
    this._audio = types;
    if (this._audio) {
      audioTypes.forEach(type => {
        this.types.push(type);
        this.typesString += type + ',';
      });
    }
  }

  @Input()
  get view(): boolean {
    return this._view;
  }

  set view(mode: boolean) {
    this._view = mode;
  }

  @Input()
  get download(): boolean {
    return this._download;
  }

  set download(mode: boolean) {
    this._download = mode;
  }

  @Input()
  get addFile(): boolean {
    return this._addFile;
  }

  set addFile(mode: boolean) {
    this._addFile = mode;
  }

  @Input()
  get scanFile(): boolean {
    return this._scanFile;
  }

  set scanFile(mode: boolean) {
    this._scanFile = mode;
  }

  @Input()
  get webcamFile(): boolean {
    return this._webcamFile;
  }

  set webcamFile(mode: boolean) {
    this._webcamFile = mode;
  }

  @Input()
  get delete(): boolean {
    return this._delete;
  }

  set delete(mode: boolean) {
    this._delete = mode;
  }

  @Input()
  get changes(): boolean {
    return this._changes;
  }

  set changes(change: boolean) {
    this._changes = change;

    if (this._changes) {
      this.changeDetector.reattach();
    } else {
      this.changeDetector.detach();
    }
  }

  constructor(
    protected sanitizer: DomSanitizer,
    protected eventManager: JhiEventManager,
    protected changeDetector: ChangeDetectorRef,
    protected actionsService: FileActionsService
  ) {}

  ngOnInit(): void {
    if (!this.archivos) {
      this.archivos = [];
    }
  }

  ngOnDestroy(): void {}

  handleData(fileList: FileList): void {
    const files: File[] = Array.from(fileList);
    console.warn('entro archivo', files);
    const agregados = this.archivos ? this.archivos.length : 0;
    if (this.maxFiles !== null && this.maxFiles !== undefined && files.length > this.maxFiles - agregados) {
      this.eventManager.broadcast({
        name: 'ErrorNotification',
        content: {
          title: 'Limite exedido',
          message: `La seleccion es mayor al número de archivos permitidos. El máximo es ${this.maxFiles} archivos.`,
        },
      });
    }
    if (files && files.length) {
      this.loading = true;
      files
        .filter((file: File) => {
          const fileSizeMB = file.size / 1024 / 1024;
          if (fileSizeMB > this.maxFileSize) {
            this.eventManager.broadcast({
              name: 'ErrorNotification',
              content: {
                title: 'Archivo demasiado grande',
                message: `El archivo "${file.name}" supera los ${this.maxFileSize} MB.`,
              },
            });
            return false;
          } else if (this.types && this.types.length > 0 && !this.types.includes(file.type)) {
            this.eventManager.broadcast({
              name: 'ErrorNotification',
              content: {
                title: 'Tipo inválido',
                message: `El archivo "${file.name}" es de tipo inválido.`,
              },
            });
            return false;
          }
          return true;
        })
        .forEach((file: File) => {
          this.uploadMultipart(file);
        });
      this.loading = false;
      if (this.inputFile) {
        this.inputFile.nativeElement.value = null;
      }
    }
  }

  processHandledFile(event: any, file: File): void {}

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && this.addFile) {
      if (this.addFile) {
        this.handleData(event.dataTransfer.files);
      }
      event.dataTransfer.clearData();
    }
    this.dragging = false;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  uploadFile(archivo: X): void {}

  beforeUpload(archivo: X): X {
    archivo.loading = true;
    if (!this.archivos) {
      this.archivos = [];
    }
    if (!archivo.nombre) {
      archivo.nombre = 'Archivo (' + this.archivos.length + ')';
    }
    const existe = this.archivos.findIndex(f => f.nombre === archivo.nombre);
    if (existe !== -1) {
      archivo.nombre = '(Copia)-' + archivo.nombre;
    }
    this.archivos.push(archivo);
    this.archivosChange.emit(this.archivos);
    return archivo;
  }

  afterUpload(res: HttpResponse<X>, nombre: string): void {
    if (!this.archivosUploadedId) {
      this.archivosUploadedId = [];
    }
    if (!this.archivosId) {
      this.archivosId = [];
    }
    if (res.body) {
      const newFile = res.body;
      newFile.loading = false;
      this.archivosUploadedId.push(newFile.id);
      if (this.archivos) {
        const index = this.archivos.findIndex(f => f.nombre === nombre);
        Object.assign(this.archivos[index], res.body);
      }
      this.archivosId.push(newFile.id);
      this.filesIdChange.emit(this.archivosId);
      this.archivosChange.emit(this.archivos);
    }
  }

  uploadMultipart(archivo: File): void {}

  agregarArchivo(): void {
    this._changes = true;
    if (this.inputFile) {
      const input = this.inputFile.nativeElement as HTMLElement;
      input.click();
    }
    this._changes = false;
  }

  getImage(file: X): any {
    return this.actionsService.getImage(file);
  }

  getImageEmpty(): any {
    return this.actionsService.getImageEmpty();
  }

  isImage(archivo: X): string {
    const index = imageTypes.indexOf(archivo.archivoContentType || '');
    if (index < 0) {
      return 'image-file';
    } else {
      return 'image-photo';
    }
  }

  eliminarArchivo(id: any): void {
    if (this.archivos) {
      const index = this.archivos.findIndex(a => a.id === id);
      if (index >= 0) {
        this.archivos.splice(index, 1);
        if (!this.archivosDeletedId) {
          this.archivosDeletedId = [];
        }
        this.archivosDeletedId.push(id);
      }
      this._changes = false;
    }
    if (this.archivosId) {
      const index = this.archivosId.indexOf(id);
      if (index >= 0) {
        this.archivosId.splice(index, 1);
        this.filesIdChange.emit(this.archivosId);
      }
    }
  }

  downloadFile(archivo: X): void {
    this.actionsService.downloadFileByUrlDirect(this.endpoint, archivo.id);
  }

  trackId(index: number, item: X): any {
    return item.id;
  }

  uploadError(nombre: string): void {
    if (this.archivos) {
      this.archivos = this.archivos.filter(f => f.nombre !== nombre);
    }
    this.eventManager.broadcast({
      name: 'ErrorNotification',
      content: {
        title: 'Error',
        message: 'No se ha podido subir tu archivo',
      },
    });
  }

  syncFiles(): void {}
}
