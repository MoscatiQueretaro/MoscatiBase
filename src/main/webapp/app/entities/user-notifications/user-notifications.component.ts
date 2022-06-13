import { Component, Input, OnInit, Output } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { SyncFilesService } from '../../utils/components/sync-files.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationsUserModel } from './user-notifications.model';
import { UserNotificationsService } from './user-notifications.service';

@Component({
  selector: 'jhi-notifications-user-list',
  templateUrl: './user-notifications.component.html',
})
export class UserNotificationsComponent implements OnInit {
  notificationsUserModelList?: NotificationsUserModel[];
  loading = false;
  @Input()
  userId?: number;

  constructor(
    private eventManager: JhiEventManager,
    private syncFileService: SyncFilesService,
    private userNotificationsService: UserNotificationsService
  ) {
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
      this.userNotificationsService.findAllNotificationsById(this.userId).subscribe(
        (res: HttpResponse<NotificationsUserModel[]>) => {
          if (res.body) {
            this.notificationsUserModelList = res.body;
            this.notificationsUserModelList.forEach(notification => {
              notification.notificacion!.descripcion = notification.notificacion!.descripcion!.replace('CDT', '');
            });
            this.loading = false;
          }
        },
        () => (this.loading = false)
      );
    }
  }
}
