import { MoscatiUserModel } from '../../../core/auth/account.model';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';

export class DetallesMedicoModel {
  constructor(
    public id?: number,
    public especialidad?: EspecialidadesModel,
    public user?: MoscatiUserModel,
    public consultorio?: string,
    public horarios?: string,
    public detalles?: string,
    public titulo?: string,
    public idioma?: string
  ) {}
}

export class HorariosMedicosModel {
  constructor(
    public id?: number,
    public user?: MoscatiUserModel,
    public horaInicio?: string | Date,
    public horaFin?: string | Date,
    public dia?: string
  ) {}
}
