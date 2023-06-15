import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AgregarPromocionComponent } from './agregar-promocion.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../../../shared/shared.module';
import { AgregarPromocionRoutes } from './agregar-promocion.routes';
import { FilesModule } from '../../../utils/components/files.module';
import { PromocionesService } from '../promociones.service';
import { QuillModule } from 'ngx-quill';
import { DatepickerModule } from '../../../utils/datepicker/datepicker.module';
import { AccountService } from '../../../core/auth/account.service';

const ROUTES = [...AgregarPromocionRoutes];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    MatTabsModule,
    CommonModule,
    QuillModule,
    FilesModule,
    FontAwesomeModule,
    MatDividerModule,
    DatepickerModule,
  ],
  declarations: [AgregarPromocionComponent],
  entryComponents: [AgregarPromocionComponent],
  providers: [PromocionesService, AccountService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgregarPromocionModule {}
