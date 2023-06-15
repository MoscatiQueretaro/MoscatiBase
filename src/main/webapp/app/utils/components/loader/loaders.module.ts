import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LottieAnimationViewModule } from 'ng-lottie';
import { LoadersComponent } from './loaders.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [FormsModule, CommonModule, LottieAnimationViewModule, MatCardModule],
  declarations: [LoadersComponent],
  exports: [LoadersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadersModule {}
