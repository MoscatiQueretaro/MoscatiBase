import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectorioMedicoModule } from './directorio-medico/directorio-medico.module';

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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
