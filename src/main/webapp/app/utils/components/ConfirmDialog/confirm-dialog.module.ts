import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmDialogComponent } from 'app/utils/components/ConfirmDialog/confirm-dialog.component';
import { ConfirmDialogService } from 'app/utils/components/ConfirmDialog/confirm-dialog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
  exports: [ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfirmDialogModule {}
