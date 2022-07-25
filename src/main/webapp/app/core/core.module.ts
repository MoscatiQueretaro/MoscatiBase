import { LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {
  JhiConfigService,
  JhiEventManager,
  JhiLanguageService,
  missingTranslationHandler,
  NgJhipsterModule,
  translatePartialLoader,
} from 'ng-jhipster';
import locale from '@angular/common/locales/es';

import { NgbDatepickerConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { DomHandler } from 'app/utils/dom/domhandler';

import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { AuthExpiredInterceptor } from './interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotificationInterceptor } from './interceptor/notification.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'es',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
        deps: [JhiConfigService],
      },
    }),
  ],
  providers: [
    Title,
    DomHandler,
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      deps: [JhiEventManager],
      multi: true,
    },
  ],
})
export class BaseCoreModule {
  constructor(
    iconLibrary: FaIconLibrary,
    dpConfig: NgbDatepickerConfig,
    languageService: JhiLanguageService,
    ngbTooltipConfig: NgbTooltipConfig
  ) {
    ngbTooltipConfig.container = 'body';
    registerLocaleData(locale);
    languageService.init();
  }
}
