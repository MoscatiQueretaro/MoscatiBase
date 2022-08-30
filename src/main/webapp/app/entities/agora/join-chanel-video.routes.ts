import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { PagingParamsResolver } from '../../utils/pagination/PagingParamsResolver';
import { JoinChanelVideoComponent } from './join-chanel-video.component';

export const JoinChanelVideoRoutes: Routes = [
  {
    path: ':id',
    component: JoinChanelVideoComponent,
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
