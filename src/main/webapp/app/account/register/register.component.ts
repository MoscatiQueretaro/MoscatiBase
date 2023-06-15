import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegisterService } from './register.service';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RkDoctoresService } from '../../entities/rk-services/rk-doctores/rk-doctores.service';
import { RkDoctoresModel } from '../../entities/rk-services/rk-doctores/rk-doctores.model';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;
  damnerUser?: MoscatiUserModel;
  rkDoctor?: RkDoctoresModel;
  doNotMatch = false;
  professionalLicenceNotExist = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  medicCollaborator = false;
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: ['', []],
    nickname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    professionalLicence: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    specialty: ['', [Validators.minLength(1), Validators.maxLength(50)]],
  });

  constructor(
    private translateService: TranslateService,
    private registerService: RegisterService,
    private rkDoctoresService: RkDoctoresService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.damnerUser === undefined) {
      this.damnerUser = new MoscatiUserModel();
    }
    if (this.rkDoctor === undefined) {
      this.rkDoctor = new RkDoctoresModel();
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
      if (this.professionalLicenceNotExist === true) {
        this.damnerUser!.professionalLicence = null;
        this.damnerUser!.specialty = null;
      }
      this.damnerUser!.language = this.translateService.currentLang;
      this.subscribeToSaveResponse(this.registerService.create(this.damnerUser!));
    }
  }

  loginAccount(): void {
    this.router.navigate(['/login']);
  }

  cedulaView(): void {
    this.medicCollaborator = !this.medicCollaborator;
  }

  validateProfessionalLicence(): void {
    if (this.damnerUser && this.damnerUser.professionalLicence!.length === 8) {
      this.rkDoctoresService.findOneMedicByProfessionalLicence(this.damnerUser.professionalLicence!).subscribe(
        (medico: HttpResponse<RkDoctoresModel>) => {
          if (medico.body) {
            this.professionalLicenceNotExist = false;
            this.rkDoctor = medico.body;
            this.damnerUser!.name = this.rkDoctor.name;
            this.damnerUser!.firstName = this.rkDoctor.lastName;
            this.damnerUser!.lastName = this.rkDoctor.lastName2;
            this.damnerUser!.mail = this.rkDoctor.email;
            this.damnerUser!.professionalLicence = this.rkDoctor.professionalLicence;
            this.damnerUser!.nickName = this.generateNickName(this.rkDoctor.name!, this.rkDoctor.lastName!);
          }
        },
        error => {
          this.professionalLicenceNotExist = true;
        }
      );
    }
  }

  generateNickName(firstName: string, lastName: string): string {
    firstName = firstName.replace(' ', '');
    lastName = lastName.replace(' ', '');
    const nickname = firstName + lastName;
    return nickname;
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
