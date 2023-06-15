import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';
import { UserMenuModel } from './user-menu.model';
import { UserMenuService } from './user-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingView } from '../../utils/pagination/PagingView';

@Component({
  selector: 'jhi-user-horarios-list',
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent extends PagingView implements OnInit {
  userHorariosList?: UserMenuModel[];
  loading = false;
  @Input()
  userId?: number;

  constructor(
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    private syncFileService: SyncFilesService,
    private userNotificationsService: UserMenuService
  ) {
    super(router, activatedRoute, eventManager, 'descripcion');

    this.eventManager.subscribe('user-notifications-list-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    if (this.userId) {
      this.loading = true;
      this.userNotificationsService.getHorariosMedicosByUser(this.userId).subscribe(
        (res: HttpResponse<UserMenuModel[]>) => {
          if (res.body) {
            this.userHorariosList = res.body;
            this.loading = false;
          }
        },
        () => (this.loading = false)
      );
    }
  }

  navigateToCitas(): void {
    this.router.navigate(['/citas']);
  }
}
