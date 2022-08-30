import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { MoscatiUserModel } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { JhiEventManager } from 'ng-jhipster';
import { FileModel } from '../../utils/components/file.model';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  fileModel?: FileModel;
  account: MoscatiUserModel | null = null;
  adminItems = false;
  constructor(
    private loginService: LoginService,
    private syncFileService: SyncFilesService,
    private translateService: TranslateService,
    private eventManager: JhiEventManager,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if (this.isAuthenticated()) {
      this.getImageUrl();
    }
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  changeTheme(id: number): void {
    if (id === 1) {
      this.eventManager.broadcast({ name: 'change-theme', content: { theme: 'default-theme' } });
    }

    if (id === 2) {
      this.eventManager.broadcast({ name: 'change-theme', content: { theme: 'ssc-theme' } });
    }
  }

  getImageUrl(): void {
    this.syncFileService.find('foto-persona', this.accountService.getImageUrl()).subscribe((res: HttpResponse<FileModel>) => {
      if (res.body) {
        this.fileModel = res.body;
      }
    });
  }
  myProfile(): void {
    this.router.navigate(['/user-profile']);
  }
  collapseAdminItems(): void {
    this.adminItems = !this.adminItems;
  }
}
