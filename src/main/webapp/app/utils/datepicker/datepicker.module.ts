import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LottieAnimationViewModule } from 'ng-lottie';
import { DatepickerComponent } from './datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LottieAnimationViewModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerModule {}
