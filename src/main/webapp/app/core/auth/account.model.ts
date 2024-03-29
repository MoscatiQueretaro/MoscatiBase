import { FileModel } from '../../utils/components/file.model';
import { EspecialidadesModel } from '../../entities/catalogos/especialidades/especialidades.model';

export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public imageUrl: string
  ) {}
}

export class MoscatiUserModel {
  constructor(
    public id?: number,
    public nickName?: string | null,
    public authorities?: string[],
    public mail?: string | null,
    public password?: string | null,
    public passwordKey?: string,
    public theme?: string | null,
    public name?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public language?: string | null,
    public imageProfile?: string | null,
    public fotoPersona?: FileModel | null,
    public estatus?: string | null,
    public activation?: string | null,
    public professionalLicence?: string | null,
    public specialty?: EspecialidadesModel | null
  ) {}
}
