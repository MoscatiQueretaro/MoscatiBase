import { Routes } from '@angular/router';
import { AgregarPromocionComponent } from './agregar-promocion.component';
import { UserRouteAccessService } from '../../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../../utils/pagination/PagingParamsResolver';

export const AgregarPromocionRoutes: Routes = [
  {
    path: '',
    component: AgregarPromocionComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'add-promotion.json.json.title',
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
