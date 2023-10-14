import { Component, OnInit, ViewChild } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { ThemeModel } from '../../layouts/navbar/theme.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { NewImageProfilePopupService } from './new-profile-image/new-image-profile-popup.service';
import { FileModel } from '../../utils/components/file.model';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  @ViewChild(MatMenuTrigger) matMenuTriggerFor?: MatMenuTrigger;
  account?: MoscatiUserModel;
  fileModel?: FileModel;
  loading = false;
  fileFoto?: string[];
  fotografia = '';
  optionButton = 0;
  loadComponentPhoto?: boolean;
  private _theme: ThemeModel;

  constructor(
    private eventManager: JhiEventManager,
    private imagePopupService: NewImageProfilePopupService,
    private syncFileService: SyncFilesService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.eventManager.subscribe('user-profile-reload', () => {
      this.loadComponentPhoto = false;
      this.ngOnInit();
    });

    this._theme = new ThemeModel();
  }

  ngOnInit(): void {
    this.account = new MoscatiUserModel();
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
          this.getImageUrl();
        }
        this.loading = false;
      });
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
  getImageUrl(): void {
    this.syncFileService.find('foto-persona', this.accountService.getImageUrl()).subscribe((res: HttpResponse<FileModel>) => {
      if (res.body) {
        this.fileModel = res.body;
      }
    });
  }

  goToCitas(): void {
    this.router.navigate(['/citas']);
  }

  changeButtonOptions(value: string): void {
    switch (value) {
      case 'citas':
        this.optionButton = 1;
        this.goToCitas();
        break;
      case 'mensajes':
        this.optionButton = 2;
        break;
      case 'resultados':
        this.optionButton = 3;
        break;
      case 'Medicaciones':
        this.optionButton = 4;
        break;
      case 'horarios':
        this.optionButton = 5;
        break;
      case 'menu-benevento':
        this.optionButton = 6;
        break;
      case 'medicamentos':
        this.optionButton = 7;
        break;
      default:
        this.optionButton = 1;
    }
  }

  nuevaCita(): void {
    this.router.navigate(['/stepper-agenda']);
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

  nuevaPublicacion(): void {
    this.router.navigate(['/agregar-promocion']);
  }
}
