import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(c => c.UserProfileModule),
      },
      {
        path: 'stepper-agenda',
        loadChildren: () => import('./stepper-agenda/stepper-agenda.module').then(c => c.StepperAgendaModule),
      },
      {
        path: 'stepper-agenda/resumen-pago/stripe-pages',
        loadChildren: () => import('./stepper-agenda/resumen-pago/stripe-pages/stripe.module').then(c => c.StripeModule),
      },
      {
        path: 'citas',
        loadChildren: () => import('./citas/user-citas.module').then(c => c.UserCitasModule),
      },
      {
        path: 'agora',
        loadChildren: () => import('./agora/join-chanel-video.module').then(c => c.JoinChanelVideoModule),
      },
      {
        path: 'promociones',
        loadChildren: () => import('./promociones/promociones.module').then(c => c.PromocionesModule),
      },
      {
        path: 'agregar-promocion',
        loadChildren: () => import('./promociones/agregar-promocion/agregar-promocion.module').then(a => a.AgregarPromocionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
