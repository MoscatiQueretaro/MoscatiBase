import { MoscatiUserModel } from '../../core/auth/account.model';

export class NotificationsUserModel {
  constructor(
    public id?: string,
    public notificacion?: NotificationsModel,
    public userId?: MoscatiUserModel,
    public fechaVista?: string | Date,
    public fecha?: string | Date,
    public visita?: boolean
  ) {}
}

export class NotificationsModel {
  constructor(
    public id?: string,
    public fecha?: string | Date,
    public titulo?: string,
    public descripcion?: string,
    public accionId?: AccionNotificationsModel,
    public params?: string,
    public autor?: MoscatiUserModel
  ) {}
}

export class AccionNotificationsModel {
  constructor(public id?: number, public descripcion?: string) {}
}
