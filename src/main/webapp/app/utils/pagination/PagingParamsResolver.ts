import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class PagingParamsResolver implements Resolve<any> {
  constructor(private paginationUtil: JhiPaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    const sort = route.queryParams['sort'] ? route.queryParams['sort'] : undefined;
    const extras = route.queryParams['filters'] ? route.queryParams['filters'] : null;
    return {
      page: this.paginationUtil.parsePage(page),
      predicate: sort ? this.paginationUtil.parsePredicate(sort) : undefined,
      ascending: sort ? this.paginationUtil.parseAscending(sort) : undefined,
      filters: extras,
    };
  }
}
