import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from '../../config/pagination.constants';

export class PagingView {
  page?: number;
  previousPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  queryCount?: number;
  routeData: any;
  reverse?: boolean;
  predicate?: string;
  filters: any;
  loading?: boolean;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected eventManager: JhiEventManager,
    protected defaultSort: string
  ) {
    /* eslint-disable */
    this.eventManager.subscribe('paginInterception', this.interceptorHandler.bind(this));
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      if (data.pagingParams && data.pagingParams.predicate) {
        this.reverse = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
      } else if (this.defaultSort) {
        if (this.defaultSort.includes(',')) {
          const parts = this.defaultSort.split(',');
          this.predicate = parts[0];
          this.reverse = parts[1] === 'asc';
        } else {
          this.predicate = this.defaultSort;
          this.reverse = true;
        }
      }
      this.filters = data.pagingParams.filters ? JSON.parse(atob(data.pagingParams.filters)) : {};
      this.paramsParser();
    });
  }

  loadPage(page: number | undefined): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  /* eslint-disable */
  sort(): string[] {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  transition(): void {
    this.router.navigate([], { queryParams: this.getRouteParams(), replaceUrl: true });
    this.loadAll();
  }

  getRouteParams(): object {
    return {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      filters: btoa(JSON.stringify(this.filters)),
    };
  }

  getParams(): any {
    const p = this.page ? this.page - 1 : 0;
    return {
      page: p,
      size: this.itemsPerPage,
      sort: this.sort(),
      ...this.filters,
    };
  }

  interceptorHandler(params: JhiEventWithContent<any>): void {
    if (params.content && params.content.total) {
      this.totalItems = this.queryCount = params.content.total;
    }
  }

  loadAll(): void {}

  paramsParser(): void {}
}
