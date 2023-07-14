import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMenuArticulosModel } from './user-menu-articulos.model';
import { DamnerService } from '../../services/damner.service';

@Injectable()
export class UserMenuArticulosService extends DamnerService<UserMenuArticulosModel> {
  constructor(protected http: HttpClient) {
    super(http, 'articulos');
  }
}
