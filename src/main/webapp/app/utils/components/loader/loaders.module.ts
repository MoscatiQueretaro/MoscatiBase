import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LottieAnimationViewModule } from 'ng-lottie';
import { LoadersComponent } from './loaders.component';

@NgModule({
  imports: [FormsModule, CommonModule, LottieAnimationViewModule],
  declarations: [LoadersComponent],
  exports: [LoadersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadersModule {}
