import { MoscatiUserModel } from '../../../core/auth/account.model';
import { CatalogoModel } from '../../catalogos/catalogo.model';
import { StripeResponseModel } from '../resumen-pago/resumen-pago.model';

export class HorarioCitaModel {
  constructor(
    public id?: number,
    public tipoCita?: CatalogoModel,
    public fechaHoraSolicitud?: string | Date,
    public fechaHoraCita?: string | Date,
    public doctor?: MoscatiUserModel,
    public user?: MoscatiUserModel,
    public etapaCita?: CatalogoModel,
    public agoraChanel?: string,
    public pagosStripe?: StripeResponseModel
  ) {}
}

export class HorariosDisponiblesModel {
  constructor(public horarioSolicitud?: string | Date, public estatus?: string) {}
}
