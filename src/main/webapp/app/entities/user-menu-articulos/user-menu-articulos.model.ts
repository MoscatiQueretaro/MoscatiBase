import { MoscatiUserModel } from '../../core/auth/account.model';
import { FileModel } from '../../utils/components/file.model';

export class UserMenuArticulosModel {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public foto?: FileModel,
    public autor?: MoscatiUserModel
  ) {}
}
