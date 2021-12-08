import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { UserProfileComponent } from './user-profile.component';
import { PagingParamsResolver } from '../../utils/pagination/PagingParamsResolver';

export const UserProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    resolve: {
      pagingParams: PagingParamsResolver,
    },
    data: {
      pageTitle: 'user-profile.home.title',
      authorities: ['ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
  },
];
