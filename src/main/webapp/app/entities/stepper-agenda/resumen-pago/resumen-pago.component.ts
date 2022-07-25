import { Component, Input, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { ResumenPagoModel, StripeResponseModel } from './resumen-pago.model';
import { EspecialidadesModel } from '../../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumenPagoService } from './resumen-pago.service';
import { MoscatiUserModel } from '../../../core/auth/account.model';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HorarioCitaModel, HorariosDisponiblesModel } from '../horario-cita/horario-cita.model';

@Component({
  selector: 'jhi-resumen-pago',
  templateUrl: './resumen-pago.component.html',
})
export class ResumenPagoComponent extends PagingView implements OnInit {
  loading = false;
  especialidadFilter?: EspecialidadesModel;
  stripeResponse?: StripeResponseModel;

  @Input()
  doctormodel?: MoscatiUserModel;

  @Input()
  userModel?: MoscatiUserModel;

  @Input()
  citaSolicitud?: HorarioCitaModel;

  stripePromise = loadStripe('pk_test_51LKPKLESu4j2SCWvs52H743rq6ubimMb18kkc37ESjtY0bgymlruFAd3yBDTv0MncVDxkrlavHJQOVhL6YMPL4nN001IWgyH8n');

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
    const payment = {
      name: 'Iphone',
      currency: 'mxn',
      // amount on cents *10 => to be on dollar
      amount: 9999,
      quantity: '1',
      cancelUrl: 'http://localhost:9000/cancel',
      successUrl: 'http://localhost:9000/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.service.createPay(payment).subscribe(
      (res: HttpResponse<StripeResponseModel>) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        if (res.body) {
          this.stripeResponse = res.body;
          console.warn('redirect to checkout whit id:', this.stripeResponse.id);
          if (stripe !== null) {
            stripe.redirectToCheckout({
              sessionId: this.stripeResponse.id,
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
