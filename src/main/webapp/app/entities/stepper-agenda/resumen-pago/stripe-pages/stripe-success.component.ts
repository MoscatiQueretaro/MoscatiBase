import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingView } from '../../../../utils/pagination/PagingView';
import { AccountService } from '../../../../core/auth/account.service';
import { HttpResponse } from '@angular/common/http';
import { StripeResponseModel } from '../resumen-pago.model';
import { HorarioCitaService } from '../../horario-cita/horario-cita.service';
import { CatalogoModel } from '../../../catalogos/catalogo.model';
import { MoscatiUserModel } from '../../../../core/auth/account.model';
import { UserCitasModel } from '../../../citas/user-citas.model';

@Component({
  selector: 'jhi-stripe-succes',
  templateUrl: './stripe-success.component.html',
})
export class StripeSuccessComponent extends PagingView implements OnInit {
  formStepsNum = 0;
  horarioDisponible = true;
  doctorId?: string;
  userId?: string;
  fechaHoraSolicitud?: string;
  stripeId?: string;
  horarioCitaModel?: UserCitasModel;
  loading = true;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: HorarioCitaService,
    public eventManager: JhiEventManager,
    private accountService: AccountService
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('stripe-success-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.horarioCitaModel = new UserCitasModel();

    this.activatedRoute.queryParams.subscribe(params => {
      this.horarioCitaModel!.doctor = new MoscatiUserModel(
        params['doctorId'],
        null,
        [],
        null,
        null,
        '',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      this.horarioCitaModel!.user = new MoscatiUserModel(
        params['userId'],
        null,
        [],
        null,
        null,
        '',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      this.horarioCitaModel!.fechaHoraSolicitud = params['fechaHoraSolicitud'];
      this.horarioCitaModel!.pagosStripe = new StripeResponseModel(0, '', params['keyStripeId'], 0, '', null);
      this.horarioCitaModel!.etapaCita = new CatalogoModel(1, 'SOLICITUD');
      this.horarioCitaModel!.tipoCita = new CatalogoModel(1, 'VIRTUAL');
    });
    console.warn(this.horarioCitaModel);

    this.service.create(this.horarioCitaModel).subscribe(
      (res: HttpResponse<UserCitasModel>) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        if (res.body) {
          this.horarioCitaModel = res.body;
          this.loading = false;
        }
      },
      () => {
        this.loading = false;
      }
    );
  }

  goToCitas(): void {
    this.router.navigate(['/citas']);
  }
}
