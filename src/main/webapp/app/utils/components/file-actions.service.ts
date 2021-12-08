import { Injectable } from '@angular/core';
import { FileModel } from './file.model';
import { HttpResponse } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { SyncFilesService } from './sync-files.service';
import { DocumentPopupService } from './document-popup.service';

export const DOC = 'application/msword';
export const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const DOCM = 'application/vnd.ms-word.document.macroEnabled.12';
export const XLS = 'application/vnd.ms-excel';
export const XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const XLSM = 'application/vnd.ms-excel.sheet.macroEnabled.12';
export const PDF = 'application/pdf';
export const PNG = 'image/png';
export const JPG = 'image/jpg';
export const JPEG = 'image/jpeg';
export const BMP = 'image/bmp';
export const SVG = 'image/svg+xml';
export const PPT = 'application/vnd.ms-powerpoint';
export const PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
export const PPTM = 'application/vnd.ms-powerpoint.presentation.macroEnabled.12';
export const TXT = 'text/plain';
export const PPSX = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
export const MP4 = 'video/mp4';
export const AUDIO_BASIC = 'audio/basic';
export const AUDIO_MIDI = 'audio/midi';
export const AUDIO_MPEG = 'audio/mpeg';
export const AUDIO_X_AIFF = 'audio/x-aiff';
export const AUDIO_X_MPEGURL = 'audio/x-mpegurl';
export const AUDIO_X_PN_REALAUDIO = 'audio/x-pn-realaudio';
export const AUDIO_X_WAV = 'audio/x-wav';
export const HTML = 'text/html';
export const MULTIPART = 'multipart/form-data';

export const audioTypes = [AUDIO_BASIC, AUDIO_MIDI, AUDIO_MPEG, AUDIO_X_AIFF, AUDIO_X_MPEGURL, AUDIO_X_PN_REALAUDIO, AUDIO_X_WAV];

export const imageTypes = [PNG, JPG, JPEG, BMP, SVG];

export const videoTypes = [MP4];

export const excelTypes = [XLS, XLSX, XLSM];

export const wordTypes = [DOC, DOCX, DOCM];

export const pptxTypes = [PPT, PPTM, PPTX];

export const webTypes = [HTML, MULTIPART];

export const allowedTypes = [PDF];

// export const EXTERNAL_URL_DEV = 'http://cias.ddns.net/InventariosD/api/cti/file-to-see/';
// export const EXTERNAL_URL_PROD = 'http://cias.ddns.net/Inventarios/api/cti/file-to-see/';

@Injectable()
export class FileActionsService {
  private url = 'pdf-file';

  constructor(private popupService: DocumentPopupService, private fileService: SyncFilesService, private sanitizer: DomSanitizer) {}

  // public openScanner(): Observable<PhotoUserAlbumModel[]> {
  //     return new Observable<PhotoUserAlbumModel[]>((subscriber: Subscriber<PhotoUserAlbumModel[]>) => {
  //         this.fileService.connect().subscribe(() => {
  //             this.fileService.openScanner().subscribe((res) => {
  //                 subscriber.next(res.body || []);
  //             }, () => {
  //                 subscriber.error(null);
  //             });
  //         }, () => {
  //             location.assign('ciasescaner://');
  //             subscriber.error(null);
  //         });
  //     });
  // }

  public openFileByUrl(url: string, id?: string, name?: string, external = false): Observable<FileModel> {
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (id) {
        if (external) {
          this.fileService.findFullExternal(url, id).subscribe(
            (response: HttpResponse<FileModel>) => {
              const file = response.body;
              if (file) {
                if (name) {
                  file.nombre = name;
                }
                this.openFileByModel(file, url).subscribe(
                  res => {
                    subscriber.next(res);
                  },
                  () => {
                    subscriber.error(null);
                  }
                );
              } else {
                subscriber.error(null);
              }
            },
            () => {
              subscriber.error(null);
            }
          );
        } else {
          this.fileService.findFull(url, id).subscribe(
            (response: HttpResponse<FileModel>) => {
              const file = response.body;
              if (file) {
                if (name) {
                  file.nombre = name;
                }
                this.openFileByModel(file, url).subscribe(
                  res => {
                    subscriber.next(res);
                  },
                  () => {
                    subscriber.error(null);
                  }
                );
              } else {
                subscriber.error(null);
              }
            },
            () => {
              subscriber.error(null);
            }
          );
        }
      } else {
        subscriber.error(null);
      }
    });
  }

  // public openOrDownloadFileByUrl(url: string, id?: string, name?: string): Observable<PhotoUserAlbumModel> {
  //     return new Observable<PhotoUserAlbumModel>((subscriber: Subscriber<PhotoUserAlbumModel>) => {
  //         if (id) {
  //             this.fileService.find(url, id).subscribe((response: HttpResponse<PhotoUserAlbumModel>) => {
  //                 const file = response.body;
  //                 if (file) {
  //                     if (!file.nombre && name) { file.nombre = name; }
  //                     this.openOrDownloadFileByModel(file, url).subscribe((fileOpened) => {
  //                         subscriber.next(fileOpened);
  //                     }, () => subscriber.error(null));
  //                 } else {
  //                     subscriber.error(null);
  //                 }
  //             }, () => {
  //                 subscriber.error(null);
  //             });
  //         } else {
  //             subscriber.error(null);
  //         }
  //     });
  // }

  public downloadFileByUrl(url: string, id?: string, name?: string, external = false): Observable<FileModel> {
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (id) {
        if (external) {
          this.fileService.findFullExternal(url, id).subscribe(
            (response: HttpResponse<FileModel>) => {
              const file = response.body;
              if (file) {
                if (!file.nombre && name) {
                  file.nombre = name;
                }
                this.downloadFileByModel(file);
                subscriber.next(file);
              } else {
                subscriber.error(null);
              }
            },
            () => {
              subscriber.error(null);
            }
          );
        } else {
          this.fileService.findFull(url, id).subscribe(
            (response: HttpResponse<FileModel>) => {
              const file = response.body;
              if (file) {
                if (!file.nombre && name) {
                  file.nombre = name;
                }
                this.downloadFileByModel(file);
                subscriber.next(file);
              } else {
                subscriber.error(null);
              }
            },
            () => {
              subscriber.error(null);
            }
          );
        }
      } else {
        subscriber.error(null);
      }
    });
  }

  // public detailsFileByUrl(url: string, id?: string, name?: string): Observable<PhotoUserAlbumModel> {
  //     return new Observable<PhotoUserAlbumModel>((subscriber: Subscriber<PhotoUserAlbumModel>) => {
  //         if (id) {
  //             this.fileService.find(url, id).subscribe((response: HttpResponse<PhotoUserAlbumModel>) => {
  //                 const file = response.body;
  //                 if (file) {
  //                     if (!file.nombre && name) { file.nombre = name; }
  //                     this.openDetailsFileByModel(file).subscribe((res: PhotoUserAlbumModel) => subscriber.next(res), () => subscriber.error(null));
  //                 } else {
  //                     subscriber.error(null);
  //                 }
  //             }, () => {
  //                 subscriber.error(null);
  //             });
  //         } else {
  //             subscriber.error(null);
  //         }
  //     });
  // }

  public changeNameFileByUrl(url: string, id?: string, name?: string): Observable<FileModel> {
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (id) {
        this.fileService.find(url, id).subscribe(
          (response: HttpResponse<FileModel>) => {
            const file = response.body;
            if (file) {
              if (!file.nombre && name) {
                file.nombre = name;
              }
              this.openChangeNameFileByModel(file).subscribe(
                (res: FileModel) => subscriber.next(res),
                () => subscriber.error(null)
              );
            } else {
              subscriber.error(null);
            }
          },
          () => {
            subscriber.error(null);
          }
        );
      } else {
        subscriber.error(null);
      }
    });
  }
  /* eslint-disable */
  public openFileByModel(entity: FileModel, url?: string): Observable<FileModel> {
    if (!entity.nombre) {
      entity.nombre = new Date().getTime() + '';
    }
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (entity.archivoContentType) {
        const indexFiles = allowedTypes.indexOf(entity.archivoContentType);
        if (indexFiles >= 0) {
          subscriber.next(entity);
        } else {
          if (entity && entity.archivoContentType) {
            let index = imageTypes.indexOf(entity.archivoContentType);
            if (index < 0) {
              index = videoTypes.indexOf(entity.archivoContentType);
            }
            if (index < 0) {
              index = audioTypes.indexOf(entity.archivoContentType);
            }
            if (index >= 0) {
              this.popupService.openPhoto(entity, url);
              subscriber.next(entity);
              subscriber.complete();
            } else {
              subscriber.error(null);
              subscriber.complete();
            }
          } else {
            subscriber.error(null);
            subscriber.complete();
          }
        }
      } else {
        subscriber.error(null);
        subscriber.complete();
      }
    });
  }

  public openDetailsFileByModel(entity: FileModel): Observable<FileModel> {
    if (!entity.nombre) {
      entity.nombre = new Date().getTime() + '';
    }
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (entity) {
        // this.popupService.openDetails(entity);
        subscriber.next(entity);
      }
    });
  }

  public openChangeNameFileByModel(entity: FileModel): Observable<FileModel> {
    if (!entity.nombre) {
      entity.nombre = new Date().getTime() + '';
    }
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (entity) {
        // this.popupService.openDialogName(entity);
        subscriber.next(entity);
      }
    });
  }

  public openOrDownloadFileByModel(entity: FileModel, url?: string): Observable<FileModel> {
    if (!entity.nombre) {
      entity.nombre = new Date().getTime() + '';
    }
    return new Observable<FileModel>((subscriber: Subscriber<FileModel>) => {
      if (entity.archivoContentType) {
        const indexFiles = allowedTypes.indexOf(entity.archivoContentType);
        if (indexFiles >= 0) {
          // this.popupService.open(entity, url);
          subscriber.next(entity);
        } else {
          const index = imageTypes.indexOf(entity.archivoContentType);
          const indexVideo = videoTypes.indexOf(entity.archivoContentType);
          if (index >= 0 || indexVideo >= 0) {
            this.popupService.openPhoto(entity, url);
            subscriber.next(entity);
            subscriber.complete();
          } else if (url) {
            this.downloadFileByUrl(url, entity.id).subscribe(
              res => {
                subscriber.next(res);
                subscriber.complete();
              },
              () => {
                subscriber.error(null);
                subscriber.complete();
              }
            );
          } else {
            subscriber.error(null);
            subscriber.complete();
          }
        }
      } else {
        subscriber.error(null);
        subscriber.complete();
      }
    });
  }

  public downloadFileByUrlDirect(url: string, id: string): void {
    const a = document.createElement('a');
    a.setAttribute('href', this.fileService.resourceOpenUrl + url + '/' + id);
    a.setAttribute('target', '_bank');
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public downloadFileByModel(entity: FileModel): void {
    const byteArray = this.b64toBlob(entity.archivo, entity.archivoContentType);
    const blob = new Blob([byteArray], { type: entity.archivoContentType });
    const a = document.createElement('a');
    const fileUrl = window.URL.createObjectURL(blob);
    a.setAttribute('href', fileUrl);
    document.body.appendChild(a);
    if (entity.nombre) {
      if (entity.nombre.split('.').length > 0) {
        a.download = entity.nombre;
      } else {
        a.download = entity.nombre + '.' + this.getExtension(entity);
      }
    } else {
      a.download = new Date().getTime() + '.' + this.getExtension(entity);
    }
    a.click();
    window.URL.revokeObjectURL(fileUrl);
  }

  public printFileByModel(entity: FileModel): void {
    const byteArray = this.b64toBlob(entity.archivo, entity.archivoContentType);
    const blob = new Blob([byteArray], { type: entity.archivoContentType });
    const fileUrl = window.URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = fileUrl;
    document.body.appendChild(iframe);
    if (iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  }

  public b64toBlob(b64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public getExtension(file: FileModel): string {
    if (file && file.archivoContentType) {
      if (file.archivoContentType.startsWith(PNG)) {
        return 'png';
      } else if (file.archivoContentType.startsWith(JPG)) {
        return 'jpg';
      } else if (file.archivoContentType.startsWith(SVG)) {
        return 'svg';
      } else if (file.archivoContentType.startsWith(JPEG)) {
        return 'jpeg';
      } else if (file.archivoContentType.startsWith(BMP)) {
        return 'bmp';
      } else if (file.archivoContentType.startsWith(PDF)) {
        return 'pdf';
      } else if (file.archivoContentType.startsWith(DOC)) {
        return 'doc';
      } else if (file.archivoContentType.startsWith(DOCX)) {
        return 'docx';
      } else if (file.archivoContentType.startsWith(XLS)) {
        return 'xls';
      } else if (file.archivoContentType.startsWith(XLSX)) {
        return 'xlsx';
      } else if (file.archivoContentType.startsWith(PPT)) {
        return 'ppt';
      } else if (file.archivoContentType.startsWith(PPSX)) {
        return 'pptx';
      } else if (file.archivoContentType.startsWith(PPTX)) {
        return 'ppt';
      } else if (file.archivoContentType.startsWith(TXT)) {
        return 'txt';
      } else if (file.archivoContentType.startsWith(DOCM)) {
        return 'docm';
      } else if (file.archivoContentType.startsWith(XLSM)) {
        return 'xlsm';
      } else if (file.archivoContentType.startsWith(PPTM)) {
        return 'pptm';
      } else if (file.archivoContentType.startsWith(MP4)) {
        return 'mp4';
      } else if (file.archivoContentType.startsWith(AUDIO_BASIC)) {
        return 'au';
      } else if (file.archivoContentType.startsWith(AUDIO_MIDI)) {
        return 'midi';
      } else if (file.archivoContentType.startsWith(AUDIO_MPEG)) {
        return 'mp3';
      } else if (file.archivoContentType.startsWith(AUDIO_X_AIFF)) {
        return 'aiff';
      } else if (file.archivoContentType.startsWith(AUDIO_X_MPEGURL)) {
        return 'm3u';
      } else if (file.archivoContentType.startsWith(AUDIO_X_PN_REALAUDIO)) {
        return 'ram';
      } else if (file.archivoContentType.startsWith(AUDIO_X_WAV)) {
        return 'wav';
      }
      return '';
    }
    return '';
  }

  public getLottieConfigUpdate(): any {
    return {
      animationData: require('../../../content/lottie/upload.json'),
      autoplay: true,
      loop: true,
    };
  }

  public getLottieConfigDownload(): any {
    return {
      animationData: require('../../../content/lottie/download.json'),
      autoplay: true,
      loop: true,
    };
  }

  public getLottieConfigLoader(): any {
    return {
      animationData: require('../../../content/lottie/loader.json'),
      autoplay: true,
      loop: true,
    };
  }

  public getImage(file: FileModel): any {
    if (file && file.archivoContentType) {
      if (file.archivoContentType.startsWith('image')) {
        if (file.archivo) {
          return this.sanitizer.bypassSecurityTrustResourceUrl('data:' + file.archivoContentType + ';base64,' + file.archivo);
        } else if (file.archivoContentType.startsWith(PNG)) {
          return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
        } else if (file.archivoContentType.startsWith(JPG)) {
          return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
        } else if (file.archivoContentType.startsWith(JPEG)) {
          return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
        }
      } else if (file.archivoContentType.startsWith(PDF)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(DOC)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(DOCX)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(XLS)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(XLSX)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(PPT)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(PPSX)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(PPTX)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(TXT)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(BMP)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith(AUDIO_MPEG)) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith('rar')) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      } else if (file.archivoContentType.startsWith('zip')) {
        return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
      }
    }
    return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
  }

  public getImageEmpty(): any {
    return 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png';
  }
}
