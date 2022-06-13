import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegisterService } from './register.service';
import { MoscatiUserModel } from '../../core/auth/account.model';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;
  damnerUser?: MoscatiUserModel;
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: ['', []],
    nickname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(private translateService: TranslateService, private registerService: RegisterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.damnerUser === undefined) {
      this.damnerUser = new MoscatiUserModel();
    }
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    if (
      this.damnerUser!.password !== this.registerForm.get(['confirmPassword'])!.value &&
      this.damnerUser!.name !== null &&
      this.damnerUser!.name !== undefined &&
      this.damnerUser!.name !== '' &&
      this.damnerUser!.firstName !== null &&
      this.damnerUser!.firstName !== undefined &&
      this.damnerUser!.firstName !== ''
    ) {
      this.doNotMatch = true;
    } else {
      this.damnerUser!.language = this.translateService.currentLang;
      this.registerService.create(this.damnerUser!).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
