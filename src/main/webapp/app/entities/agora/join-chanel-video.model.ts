export class AgoraModel {
  constructor(
    public appId: string,
    public appCertificate: string,
    public channelName: string,
    public uid: number,
    public token: string,
    public expirationTimeInSeconds?: number,
    public role?: number
  ) {}
}
