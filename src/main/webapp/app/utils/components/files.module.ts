import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FileDropAreaCustomComponent } from './file-drop-area-custom.component';
import { PhotoComponent } from './photo.component';
import { DocumentPopupService } from './document-popup.service';
import { FileActionsService } from './file-actions.service';
import { SyncFilesService } from './sync-files.service';
import { SingleFileTemplateComponent } from './single-file-template.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDialogModule } from './ConfirmDialog/confirm-dialog.module';

// import {NgxAudioPlayerModule} from 'ngx-audio-player';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ConfirmDialogModule,
    // NgxAudioPlayerModule
  ],
  declarations: [FileDropAreaCustomComponent, PhotoComponent, SingleFileTemplateComponent],
  entryComponents: [FileDropAreaCustomComponent, PhotoComponent, SingleFileTemplateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SyncFilesService, DocumentPopupService, FileActionsService, DatePipe],
  exports: [FileDropAreaCustomComponent, PhotoComponent, SingleFileTemplateComponent],
})
export class FilesModule {}
