import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    <div *ngIf="ribbonEnv$ | async as ribbonEnv">
      <a href="" jhiTranslate="global.ribbon.{{ ribbonEnv }}">{{ ribbonEnv }}</a>
    </div>
  `,
  styleUrls: ['./page-ribbon.component.scss'],
})
export class PageRibbonComponent implements OnInit {
  ribbonEnv$?: Observable<string | undefined>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));
  }
}
