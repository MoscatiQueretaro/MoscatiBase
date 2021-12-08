import { Component, OnInit, ViewChild } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { DamnerUserModel } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { ThemeModel } from '../../layouts/navbar/theme.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { NewImageProfilePopupService } from './new-profile-image/new-image-profile-popup.service';

@Component({
  selector: 'jhi-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  @ViewChild(MatMenuTrigger) matMenuTriggerFor?: MatMenuTrigger;
  account?: DamnerUserModel;
  loading = false;
  fileFoto?: string[];
  fotografia = '';
  loadComponentPhoto?: boolean;
  private _theme: ThemeModel;

  constructor(
    private eventManager: JhiEventManager,
    private imagePopupService: NewImageProfilePopupService,
    private accountService: AccountService
  ) {
    this.eventManager.subscribe('user-profile-reload', () => {
      this.loadComponentPhoto = false;
      this.ngOnInit();
    });

    this._theme = new ThemeModel();
  }

  ngOnInit(): void {
    this.account = new DamnerUserModel();
    this.fileFoto = [];
    console.warn('entro perfil', this.fileFoto);
    if (this.isAuthenticated()) {
      this.loading = true;
      this.accountService.identity(true).subscribe(account => {
        if (account) {
          this.loadComponentPhoto = true;
          console.warn(account);
          this.account = account;
          const theme = this.account.theme;
          if (theme) {
            this._theme = new ThemeModel(theme.split(' ')[0]);
          }
          if (this.account.imageProfile) {
            this.fileFoto!.push(this.account.imageProfile);
          }
        }
        this.loading = false;
      });
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  /* eslint-disable */
  abrirPerfil(): void {
    if (this.account && this.account.id) {
      if (this.fileFoto!.length && this.account.imageProfile) {
        this.imagePopupService.open(this.fileFoto![0], this.account.id);
      } else {
        this.imagePopupService.open(undefined, this.account.id);
      }
    }
  }
}
