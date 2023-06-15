import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../utils/pagination/PagingParamsResolver';
import { PromocionesComponent } from './promociones.component';
export const PromocionesRoutes: Routes = [
  {
    path: '',
    component: PromocionesComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'user-profile.home.title',
      authorities: [
        'ROLE_ADMIN',
        'ROLE_USER',
        'ROLE_DOCTOR',
        'ROLE_LABORATORIO',
        'ROLE_BENEVENTO',
        'ROLE_FARMACIA',
        'ROLE_MOSCATI',
        'ROLE_SANNIA',
      ],
    },
    canActivate: [UserRouteAccessService],
  },
];
