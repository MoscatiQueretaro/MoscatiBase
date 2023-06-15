import { AfterViewInit, Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd, RouteConfigLoadStart } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as dayjs from 'dayjs';
import { AccountService } from 'app/core/auth/account.service';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  themeSubscription: Subscription;
  theme: string;
  loading = false;

  classPrincipal = 'wrapper';
  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private eventManager: JhiEventManager,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) {
    this.theme = 'default-theme';
    this.themeSubscription = this.eventManager.subscribe('change-theme', (response: any) => {
      this.renderer.removeClass(document.querySelector('body'), this.theme);
      this.theme = response.content.theme;

      console.warn('se cabiara el tema a ', response);
      this.renderer.addClass(document.querySelector('body'), this.theme);
    });
    this.router.events.subscribe(event => {
      this.loading = event instanceof RouteConfigLoadStart ? true : false;
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('body'), this.theme);

    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.themeSubscription);
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
