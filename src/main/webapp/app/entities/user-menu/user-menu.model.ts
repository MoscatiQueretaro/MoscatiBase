import { MoscatiUserModel } from '../../core/auth/account.model';

export class UserMenuModel {
  constructor(
    public id?: number,
    public user?: MoscatiUserModel,
    public horaInicio?: string | Date,
    public horaFin?: string | Date,
    public dia?: number
  ) {}
}
