import { MoscatiUserModel } from '../../core/auth/account.model';
import { EspecialidadesModel } from '../catalogos/especialidades/especialidades.model';
import { CatalogoModel } from '../catalogos/catalogo.model';
import { StripeModule } from '../stepper-agenda/resumen-pago/stripe-pages/stripe.module';
import { StripeResponseModel } from '../stepper-agenda/resumen-pago/resumen-pago.model';
import { EtapaCitaModel } from './bandejas-citas/etapa-cita.model';

export class UserCitasModel {
  constructor(
    public id?: number,
    public tipoCita?: CatalogoModel,
    public fechaHoraSolicitud?: string | Date,
    public fechaHoraCita?: string | Date,
    public doctor?: MoscatiUserModel,
    public user?: MoscatiUserModel,
    public etapaCita?: EtapaCitaModel,
    public agoraChanel?: string,
    public pagosStripe?: StripeResponseModel
  ) {}
}
