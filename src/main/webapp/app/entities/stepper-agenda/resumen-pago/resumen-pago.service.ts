import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../../app.constants';
import { DamnerService } from '../../../services/damner.service';
import { StripeResponseModel } from './resumen-pago.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResumenPagoService extends DamnerService<StripeResponseModel> {
  private url = SERVER_API_URL + 'api/stripe';

  constructor(protected http: HttpClient) {
    super(http, 'stripe');
  }

  createPay(entity: any): Observable<HttpResponse<StripeResponseModel>> {
    const copy = this.convert(entity);
    return this.http
      .post<StripeResponseModel>(`${this.resourceUrl}/create-checkout-session`, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<StripeResponseModel>) => this.convertResponse(res)));
  }
}
