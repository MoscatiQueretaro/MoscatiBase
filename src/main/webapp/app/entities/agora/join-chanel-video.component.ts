import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinChanelVideoService } from './join-chanel-video.service';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { AgoraModel } from './join-chanel-video.model';
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack, IRemoteAudioTrack } from 'agora-rtc-sdk-ng';
import { UserCitasService } from '../citas/user-citas.service';
import { UserCitasModel } from '../citas/user-citas.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-user-citas',
  templateUrl: './join-chanel-video.component.html',
  styleUrls: ['./join-chanel-video.styles.scss'],
})
export class JoinChanelVideoComponent extends PagingView implements OnInit {
  agoraModel?: AgoraModel;
  citaId?: number;
  loading = false;
  localCameraEnabled = false;
  remoteCameraEnabled = false;
  userCita?: UserCitasModel;
  remoteUserAccount?: MoscatiUserModel;
  userAccount?: MoscatiUserModel;
  client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  options = {
    appid: 'd9f3bff461c34f31b21050001ee3dd48',
    channel: '',
    uid: 0,
    token: '',
  };
  remoteUsers = Object.assign({});
  remotePlayerlist: any;
  localPlayer: any;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected joinChanelVideoService: JoinChanelVideoService,
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
    this.userCitasService.find(this.citaId).subscribe((res: HttpResponse<UserCitasModel | null>) => {
      if (res.body) {
        this.userCita = res.body;
        if (this.userAccount!.id !== this.userCita.user!.id) {
          this.remoteUserAccount = this.userCita.user;
        }
        if (this.userAccount!.id !== this.userCita.doctor!.id) {
          this.remoteUserAccount = this.userCita.doctor;
        }
        this.agoraModel = new AgoraModel('', '', this.userCita.agoraChanel!, 0, '', 5400, 1);
        this.joinChanelVideoService.createChanel(this.agoraModel).subscribe((agora: HttpResponse<AgoraModel | null>) => {
          if (agora.body) {
            this.agoraModel = agora.body;
          }
        });
      }

      console.warn('user cita:', this.userCita);
    });
  }

  /* eslint-disable */

  async joinChanel() {
    try {
      if (this.agoraModel) {
        this.options.token = this.agoraModel.token;
        this.options.channel = this.agoraModel.channelName;
        this.options.uid = this.agoraModel.uid;
      }
      console.warn(this.options);
      await this.join();
    } catch (error) {
      console.error(error);
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

    this.client.on('user-unpublished', this.handleUserUnpublished);
    // join a channel and create local tracks, we can use Promise.all to run them concurrently
    this.options.uid = Number(this.client.join(this.options.appid, this.options.channel, this.options.token || null));
    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    if (cameraTrack) {
      this.localCameraEnabled = true;
    }
    // Sample the audio from the microphone
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

    this.localPlayer = document.getElementById('local-player');

    cameraTrack!.play(this.localPlayer ? this.localPlayer : '');
    microphoneTrack!.setEnabled(true);
    // $("#local-player-name").text(`localVideo(${this.options.uid})`);
    const localPlayer = document.getElementById('local-player-name');
    if (localPlayer !== null) {
      localPlayer.setAttribute('textContent', 'localVideo(' + this.options.uid + ')');
    }

    // publish local tracks to channel

    await this.client.publish(Object.values([microphoneTrack, cameraTrack]));
    console.log('publish success');
  }

  handleUserUnpublished(user: any): void {
    const id = user.uid;
    delete this.remoteUsers[id];
    const playerWrapper = document.getElementById('player-wrapper-' + id);
    if (playerWrapper !== null) {
      playerWrapper.remove();
    }
  }
}
