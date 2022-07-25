import { MoscatiUserModel } from '../../../core/auth/account.model';
import { CatalogoModel } from '../../catalogos/catalogo.model';

export class HorarioCitaModel {
  constructor(
    public id?: number,
    public tipoCita?: CatalogoModel,
    public fechaHoraSolicitud?: string | Date,
    public fechaHoraCita?: string | Date,
    public doctor?: MoscatiUserModel,
    public user?: MoscatiUserModel,
    public etapaCita?: CatalogoModel,
    public agoraChanel?: string
  ) {}
}

export class HorariosDisponiblesModel {
  constructor(public horarioSolicitud?: string | Date, public estatus?: string) {}
}
