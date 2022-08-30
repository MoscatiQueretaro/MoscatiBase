import { CatalogoModel } from '../../catalogos/catalogo.model';

export class ResumenPagoModel {
  constructor(public id: string) {}
}

export class StripeResponseModel {
  constructor(
    public id?: number,
    public stripeIntentId?: string,
    public stripeKey?: string,
    public stripeTotal?: number,
    public stripeDescripcion?: string,
    public etapa?: CatalogoModel | null
  ) {}
}
