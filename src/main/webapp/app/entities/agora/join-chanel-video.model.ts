import { MoscatiUserModel } from '../../core/auth/account.model';

export class AgoraModel {
  constructor(
    public appId: string,
    public appCertificate: string,
    public uid: number,
    public token: string,
    public channelName?: string,
    public expirationTimeInSeconds?: number,
    public role?: number,
    public userId?: string
  ) {}
}

export class MessageModel {
  constructor(
    public id?: number,
    public remitente?: MoscatiUserModel,
    public destinatario?: MoscatiUserModel,
    public mensaje?: string,
    public fechaHora?: string,
    public estatus?: string
  ) {}
}
