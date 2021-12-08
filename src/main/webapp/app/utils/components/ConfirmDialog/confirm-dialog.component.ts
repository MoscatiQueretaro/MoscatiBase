import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from './confirm-dialog.service';

@Component({
  selector: 'jhi-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./styles.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  data: any;
  hideCancel = false;
  hideAccept = false;

  constructor(public router: Router, private route: ActivatedRoute, private alertService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.alertService.getData().subscribe(data => {
      this.data = data;
      if (this.data) {
        this.hideCancel = this.data.hideCancel;
        this.hideAccept = this.data.hideAccept;
      }
    });
  }

  visible(): any {
    return this.data !== null ? { display: 'block', 'background-color': 'rgba(0, 0, 0, 0.5)' } : '';
  }
}
