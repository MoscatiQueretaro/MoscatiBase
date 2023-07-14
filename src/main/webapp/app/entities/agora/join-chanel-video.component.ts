import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinChanelVideoService } from './join-chanel-video.service';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { AgoraModel, MessageModel } from './join-chanel-video.model';
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { UserCitasService } from '../citas/user-citas.service';
import { UserCitasModel } from '../citas/user-citas.model';
import { HttpResponse } from '@angular/common/http';
import { AlertService } from '../../core/util/alert.service';
import { JoinChatService } from './join-chat.service';
import AgoraRTM from 'agora-rtm-sdk';

@Component({
  selector: 'jhi-user-citas',
  templateUrl: './join-chanel-video.component.html',
  styleUrls: ['./join-chanel-video.styles.scss'],
})
export class JoinChanelVideoComponent extends PagingView implements OnInit {
  agoraModel?: AgoraModel;
  agoraChatRTM?: AgoraModel;
  citaId?: number;
  loading = false;
  localCameraEnabled = false;
  localMicrophoneEnabled = false;
  remoteCameraEnabled = false;
  userCita?: UserCitasModel;
  remoteUserAccount?: MoscatiUserModel;
  userAccount?: MoscatiUserModel;
  messages: MessageModel[] = [];
  messageInput?: string;
  rtmClient: any;
  channel: any;
  client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  localCameraTrack?: ICameraVideoTrack;
  localMicrophoneTrack?: IMicrophoneAudioTrack;

  options = {
    appid: '859951576d59444e9fe1831a74a9c1a3',
    channel: '',
    uid: 0,
    token: '',
  };
  remoteUsers = Object.assign({});
  remotePlayerlist: any;
  localPlayer: any;

  @ViewChild('messageContainer') private messageContainer?: ElementRef;
  constructor(
    protected router: Router,
    private alertService: AlertService,
    protected activatedRoute: ActivatedRoute,
    protected joinChanelVideoService: JoinChanelVideoService,
    protected joinChatService: JoinChatService,
    protected userCitasService: UserCitasService,
    private accountService: AccountService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'id');
    this.citaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.warn('id:', this.citaId);

    this.accountService.identity(true).subscribe(account => {
      if (account) {
        this.userAccount = account;
      }
    });
    this.eventManager.subscribe('join-chanel-video-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.messageInput = '';
    this.userCitasService.find(this.citaId).subscribe((res: HttpResponse<UserCitasModel | null>) => {
      if (res.body) {
        this.userCita = res.body;
        if (this.userAccount!.id !== this.userCita.user!.id) {
          this.remoteUserAccount = this.userCita.user;
        }
        if (this.userAccount!.id !== this.userCita.doctor!.id) {
          this.remoteUserAccount = this.userCita.doctor;
        }

        this.agoraModel = new AgoraModel('', '', 0, '', this.userCita.agoraChanel, 5400, 1);
        this.joinChanelVideoService.createChanel(this.agoraModel).subscribe((agora: HttpResponse<AgoraModel | null>) => {
          if (agora.body) {
            this.agoraModel = agora.body;
          }
        });

        //obtain a AgoraRTM token from messaging chat enterprise
        if (this.userAccount) {
          this.agoraChatRTM = new AgoraModel('', '', 0, '', this.userCita.agoraChanel, 5400, 1);
          this.joinChatService.createRtmAgoraToken(this.agoraModel).subscribe((agoraRtm: HttpResponse<AgoraModel | null>) => {
            if (agoraRtm.body) {
              this.agoraChatRTM = agoraRtm.body;
              console.warn('TOKEN chat message:', this.agoraChatRTM.token);
            }
          });
        }
      }

      console.warn('user cita:', this.userCita);
    });
  }

  /* eslint-disable */

  async joinChanel() {
    try {
      if (this.agoraModel) {
        this.options.token = this.agoraModel.token;
        this.options.channel = this.agoraModel.channelName ?? '';
        this.options.uid = this.agoraModel.uid;
      }
      console.warn(this.options);
      await this.join();
    } catch (error) {
      console.error(error);
    }
    this.connectRTM();
  }

  async leaveChanel() {
    this.client.leave().then(async mesagge => {
      if (this.localCameraTrack) {
        await this.localCameraTrack.setEnabled(false);
        this.localCameraTrack.close();
        document.getElementById('local-player')!.remove();
        this.localCameraEnabled = false;
        console.log('abandonaste el canal', mesagge);
      }
    });
  }

  async changeCameraStatus() {
    if (this.localCameraEnabled === true) {
      await this.localCameraTrack!.setEnabled(false);
      this.localCameraEnabled = false;
    } else {
      this.localCameraEnabled = true;
      this.localCameraTrack = await AgoraRTC.createCameraVideoTrack();
      this.localPlayer = document.getElementById('local-player');
      this.localCameraTrack!.play(this.localPlayer ? this.localPlayer : '');
      const localPlayer = document.getElementById('local-player-name');
      if (localPlayer !== null) {
        localPlayer.setAttribute('textContent', 'localVideo(' + this.options.uid + ')');
      }
      await this.client.publish(Object.values([this.localCameraTrack]));
    }
  }

  async changeMicrophoneStatus() {
    if (this.localMicrophoneEnabled === true) {
      await this.localMicrophoneTrack!.setEnabled(false);
      this.localMicrophoneEnabled = false;
    } else {
      this.localMicrophoneEnabled = true;
      this.localMicrophoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.localMicrophoneTrack.setEnabled(true);
      await this.client.publish(Object.values([this.localMicrophoneTrack]));
    }
  }

  async join() {
    this.remotePlayerlist = document.getElementById('remote-playerlist');
    // add event listener to play remote tracks when remote user publishs.
    this.client.on('user-published', async (user, mediaType) => {
      // Initiate the subscription
      await this.client.subscribe(user, mediaType);
      // If the subscribed track is an audio track
      if (mediaType === 'audio') {
        const audioTrack = user.audioTrack;
        // Play the audio
        audioTrack!.play();
      } else {
        const videoTrack = user.videoTrack;
        if (videoTrack) {
          this.remoteCameraEnabled = true;
        }
        // Play the video

        videoTrack!.play(this.remotePlayerlist ? this.remotePlayerlist : '');
      }
    });
    this.client.on('user-left', async (user, mediaType) => {
      this.remoteCameraEnabled = false;
    });

    this.client.on('user-unpublished', this.handleUserUnpublished);
    // join a channel and create local tracks, we can use Promise.all to run them concurrently
    this.options.uid = Number(this.client.join(this.options.appid, this.options.channel, this.options.token || null));

    // Sample the audio from the microphone

    let alertParams: string | null = null;
    this.alertService.addAlert(
      {
        type: 'success',
        message: 'Este es un mensaje de éxito',
        toast: true,
      },
      []
    );
  }

  handleUserUnpublished(user: any): void {
    const id = user.uid;
    delete this.remoteUsers[id];
    const playerWrapper = document.getElementById('player-wrapper-' + id);
    if (playerWrapper !== null) {
      playerWrapper.remove();
    }
  }

  connectRTM() {
    this.rtmClient = AgoraRTM.createInstance(this.options.appid);
    this.rtmClient.on('ConnectionStateChanged', (newState: any, reason: any) => {
      console.log(`RTM client state changed to ${newState} reason ${reason}`);
    });
    this.rtmClient
      .login({ uid: this.agoraChatRTM!.userId, token: this.agoraChatRTM!.token })
      .then(() => {
        console.log('RTM client logged in');
        this.joinChannel();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  joinChannel() {
    this.channel = this.rtmClient.createChannel(this.agoraChatRTM!.channelName);
    this.channel.on('ChannelMessage', (message: any, memberId: any) => {
      this.messages.push(new MessageModel(undefined, this.remoteUserAccount, this.userAccount, message.text, 'enviado'));
      console.log(`Message received from user ${memberId}: ${message.text}`);
    });
    this.channel
      .join()
      .then(() => {
        console.log('Joined RTM channel');
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  sendMessage() {
    this.channel
      .sendMessage({ text: this.messageInput })
      .then(() => {
        console.log('Message sent');
        this.messages.push(new MessageModel(undefined, this.userAccount, this.remoteUserAccount, this.messageInput, 'enviado'));
        this.messageInput = '';
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
