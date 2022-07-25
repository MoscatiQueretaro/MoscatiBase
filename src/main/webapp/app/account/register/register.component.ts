import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegisterService } from './register.service';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    private translateService: TranslateService,
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
      this.subscribeToSaveResponse(this.registerService.create(this.damnerUser!));
    }
  }

  loginAccount(): void {
    this.router.navigate(['/login']);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<MoscatiUserModel>>): void {
    result.subscribe(
      () => {
        this.success = true;
      },
      response => {
        this.processError(response);
      }
    );
  }

  private processError(response: HttpErrorResponse): void {
    console.warn(response);
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
