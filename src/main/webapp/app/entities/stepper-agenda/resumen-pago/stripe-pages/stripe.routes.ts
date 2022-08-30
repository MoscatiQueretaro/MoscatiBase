import { Routes } from '@angular/router';
import { StripeSuccessComponent } from './stripe-success.component';
import { PagingParamsResolver } from '../../../../utils/pagination/PagingParamsResolver';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';

export const StripeRoutes: Routes = [
  {
    path: 'success',
    component: StripeSuccessComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'user-profile.home.title',
      authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_DOCTOR'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'cancel',
    component: StripeSuccessComponent,
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
