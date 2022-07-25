import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../../utils/pagination/PagingParamsResolver';
import { HorarioCitaSolicitudComponent } from './horario-cita-solicitud.component';

export const HorarioCitaRoutes: Routes = [
  {
    path: '',
    component: HorarioCitaSolicitudComponent,
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
