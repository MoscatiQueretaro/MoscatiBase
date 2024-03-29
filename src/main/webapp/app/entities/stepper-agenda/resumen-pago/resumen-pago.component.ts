import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { StripeResponseModel } from './resumen-pago.model';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumenPagoService } from './resumen-pago.service';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserCitasModel } from '../../citas/user-citas.model';

@Component({
  selector: 'jhi-resumen-pago',
  templateUrl: './resumen-pago.component.html',
})
export class ResumenPagoComponent extends PagingView implements OnInit {
  loading = false;
  especialidadFilter?: EspecialidadesModel;
  stripeResponse?: StripeResponseModel;
  payload = false;
  @Input()
  doctormodel?: MoscatiUserModel;

  @Input()
  userModel?: MoscatiUserModel;

  @Input()
  citaSolicitud?: UserCitasModel;

  stripePromise = loadStripe('pk_test_51MxzUtBDQa10b7roeaR45ftCquAe4qDmr0W6qtRnstsDWnyKjEgxaZJdkxQDnQk2nPWQlKzvGWxEn5JcMUSELQWK008xsaBovc');

  constructor(
    private http: HttpClient,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: ResumenPagoService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-details-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  async stripePay(): Promise<void> {
    // here we create a payment object
    this.payload = true;
    const payment = {
      name: 'Cita Medica Virtual Hospital Moscati Queretaro',
      currency: 'mxn',
      // amount on cents *10 => to be on dollar
      amount: 130000,
      quantity: '1',
      cancelUrl: 'http://localhost:9000/cancel',
      successUrl:
        'http://localhost:9000/stepper-agenda/resumen-pago/stripe-pages/success?userId=' +
        this.userModel!.id!.toString() +
        '&doctorId=' +
        this.doctormodel!.id!.toString() +
        '&fechaHoraSolicitud=' +
        this.citaSolicitud!.fechaHoraSolicitud!.toString(),
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.service.createPay(payment).subscribe(
      (res: HttpResponse<StripeResponseModel>) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        if (res.body) {
          this.stripeResponse = res.body;
          if (stripe !== null) {
            stripe.redirectToCheckout({
              sessionId: this.stripeResponse.stripeIntentId!,
            });
          }
        }
      },
      () => {
        this.loading = false;
      }
    );
  }

  loadDoctorProfile(): void {
    console.warn('doctor seleccionado: ');
  }
}
