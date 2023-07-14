import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserMenuArticulosComponent } from './user-menu-articulos.component';
import { CommonModule } from '@angular/common';
import { FilesModule } from '../../utils/components/files.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { UserMenuArticulosService } from './user-menu-articulos.service';
import { LoadersModule } from '../../utils/components/loader/loaders.module';
import { MatTableModule } from '@angular/material/table';
import { AgregarArticuloPopupService } from './agregar-menu-articulo/agregar-articulo-popup.service';
import { AgregarArticuloComponent } from './agregar-menu-articulo/agregar-articulo.component';
@NgModule({
  imports: [SharedModule, MatTabsModule, CommonModule, MatTableModule, FilesModule, FontAwesomeModule, MatDividerModule, LoadersModule],
  declarations: [UserMenuArticulosComponent, AgregarArticuloComponent],
  entryComponents: [UserMenuArticulosComponent, AgregarArticuloComponent],
  providers: [UserMenuArticulosService, AgregarArticuloPopupService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserMenuArticulosComponent],
})
export class UserMenuArticulosModule {}
