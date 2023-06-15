import { FileModel } from '../../utils/components/file.model';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { TipoPromocionModel } from '../catalogos/tipo-promocion/tipo-promocion.model';

export class PromocionesModel {
  constructor(
    public id?: number,
    public nombre?: string,
    public precio?: number,
    public descuento?: number,
    public descripcion?: string,
    public foto?: FileModel,
    public vigencia?: string | Date,
    public autor?: MoscatiUserModel,
    public tipo?: TipoPromocionModel
  ) {}
}
export class AutorModel {
  constructor(public id?: number, public descripcion?: string) {}
}
