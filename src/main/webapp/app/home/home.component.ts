import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { MoscatiUserModel } from 'app/core/auth/account.model';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: MoscatiUserModel | null = null;
  search?: string;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventManager.broadcast('navBar-reload');
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

    const valueDisplays = document.querySelectorAll('.num');
    const interval = 2;
    valueDisplays.forEach(valueDisplay => {
      let startValue = 0;
      const endValue = Number(valueDisplay.getAttribute('data-val')!.valueOf());
      const duration = Math.floor(interval / endValue);
      const counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue.toString();
        if (startValue === endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
