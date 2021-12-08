import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { Account, DamnerUserModel } from 'app/core/auth/account.model';
import { LANGUAGES } from 'app/config/language.constants';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: DamnerUserModel;
  success = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    langKey: [undefined],
  });

  constructor(private accountService: AccountService, private fb: FormBuilder, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.settingsForm.patchValue({
          firstName: account.nickName,
          lastName: account.lastName,
          email: account.mail,
          langKey: account.language,
        });

        this.account = account;
      }
    });
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.mail = this.settingsForm.get('email')!.value;
    this.account.language = this.settingsForm.get('langKey')!.value;

    this.accountService.save(this.account).subscribe(() => {
      this.success = true;

      this.accountService.authenticate(this.account);

      if (this.account.language !== this.translateService.currentLang) {
        this.translateService.use(this.account.language!);
      }
    });
  }
}
