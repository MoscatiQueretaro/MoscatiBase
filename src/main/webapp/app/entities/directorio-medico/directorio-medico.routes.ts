import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../utils/pagination/PagingParamsResolver';
import { DirectorioMedicoComponent } from './directorio-medico.component';

export const DirectorioMedicoRoutes: Routes = [
  {
    path: '',
    component: DirectorioMedicoComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'user-profile.home.title',
      authorities: ['ROLE_ADMIN', 'ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];
