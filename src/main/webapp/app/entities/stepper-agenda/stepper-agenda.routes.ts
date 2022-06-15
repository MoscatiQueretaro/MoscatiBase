import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../utils/pagination/PagingParamsResolver';
import { StepperAgendaComponent } from './stepper-agenda.component';

export const StepperAgendaRoutes: Routes = [
  {
    path: '',
    component: StepperAgendaComponent,
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
