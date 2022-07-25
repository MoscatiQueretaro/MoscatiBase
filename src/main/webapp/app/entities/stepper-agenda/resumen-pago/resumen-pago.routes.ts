import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../../utils/pagination/PagingParamsResolver';
import { ResumenPagoComponent } from './resumen-pago.component';

export const ResumenPagoRoutes: Routes = [
  {
    path: '',
    component: ResumenPagoComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'user-profile.home.title',
      authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_DOCTOR'],
    },
    canActivate: [UserRouteAccessService],
  },
];
