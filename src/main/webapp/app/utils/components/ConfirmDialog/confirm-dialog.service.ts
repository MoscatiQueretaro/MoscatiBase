import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ConfirmDialogService {
  private request = new Subject();
  /* eslint-disable */
  constructor() {}

  confirm(
    title: string,
    message: string,
    textAccept?: string,
    textCancel?: string,
    hideCancel?: boolean,
    hideAccept?: boolean
  ): Promise<any> {
    return new Promise((success, reject) => {
      this.setConfirmation(title, message, success, reject, textAccept, textCancel, hideCancel, hideAccept);
    });
  }

  setConfirmation(
    title: string,
    message: string,
    yes = (value?: any) => {},
    no = () => {},
    textAccept?: string,
    textCancel?: string,
    hideCancel?: boolean,
    hideAccept?: boolean
  ): void {
    const self = this;
    this.request.next({
      title,
      message,
      textAccept,
      textCancel,
      hideCancel,
      hideAccept,
      accept(): void {
        self.request.next();
        yes();
      },
      cancel(): void {
        self.request.next();
        no();
      },
    });
  }

  getData(): Observable<any> {
    return this.request.asObservable();
  }
}
