import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { UserCitasModel } from './user-citas.model';
import { EspecialidadesModel } from '../catalogos/especialidades/especialidades.model';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserCitasService } from './user-citas.service';
import { MoscatiUserModel } from '../../core/auth/account.model';
import { EtapaCitaModel } from './bandejas-citas/etapa-cita.model';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'jhi-user-citas',
  templateUrl: './user-citas.component.html',
  styleUrls: ['./user-citas.styles.scss'],
})
export class UserCitasComponent extends PagingView implements OnInit {
  userCitasList?: UserCitasModel[];
  loading = false;
  userAccount?: MoscatiUserModel;
  citaEtapaFilter?: string;
  tipoCitaFilter?: string;
  doctorFilter?: number;
  userFilter?: number;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: UserCitasService,
    private accountService: AccountService,
    public eventManager: JhiEventManager
  ) {
    super(router, activatedRoute, eventManager, 'etapaCita');
    this.citaEtapaFilter = 'SOLICITUD';
    this.applyFilters();
    this.accountService.identity(true).subscribe(account => {
      if (account) {
        this.userAccount = account;
      }
    });
    if (this.userAccount) {
      if (this.userAccount.authorities!.includes('ROLE_DOCTOR') || this.userAccount.authorities!.includes('ROLE_LABORATORIO')) {
        this.doctorFilter = this.userAccount.id;
      }
      if (this.userAccount.authorities!.includes('ROLE_USER')) {
        this.userFilter = this.userAccount.id;
      }
    }
    this.eventManager.subscribe('user-citas-reload', () => {
      this.ngOnInit();
      this.applyFilters();
    });
  }

  paramsParser(): void {
    if (this.filters['etapaCita.contains']) {
      this.citaEtapaFilter = this.filters['etapaCita.contains'];
    }

    if (this.filters['tipoCita.contains']) {
      this.tipoCitaFilter = this.filters['tipoCita.contains'];
    }

    if (this.filters['doctor.contains']) {
      this.doctorFilter = this.filters['doctor.contains'];
    }

    if (this.filters['user.contains']) {
      this.userFilter = this.filters['user.contains'];
    }
  }

  applyFilters(updateCounts = true): void {
    this.previousPage = undefined;
    this.page = 1;

    if (this.citaEtapaFilter !== undefined && this.citaEtapaFilter !== '') {
      this.filters['etapaCita.equals'] = this.citaEtapaFilter;
    } else {
      delete this.filters['etapaCita.equals'];
    }

    if (this.tipoCitaFilter !== undefined && this.tipoCitaFilter !== '') {
      this.filters['tipoCita.equals'] = this.tipoCitaFilter;
    } else {
      delete this.filters['tipoCita.equals'];
    }

    if (this.doctorFilter !== undefined) {
      this.filters['doctor.equals'] = this.doctorFilter;
    } else {
      delete this.filters['doctor.equals'];
    }

    if (this.userFilter !== undefined) {
      this.filters['user.equals'] = this.userFilter;
    } else {
      delete this.filters['user.equals'];
    }

    this.transition();
    if (updateCounts) {
      this.updateCounts();
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.service.query(this.getParams()).subscribe(
      (res: HttpResponse<UserCitasModel[] | null>) => {
        if (res.body) {
          this.userCitasList = res.body;
        }
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  get citaEtapaSelect(): string | undefined {
    return this.citaEtapaFilter!;
  }

  set citaEtapaSelect(value: string | undefined) {
    this.citaEtapaFilter = value;
  }

  ChangeCitaEtapaSelect(value: string): void {
    console.warn(value);
    if (value && value !== this.citaEtapaSelect) {
      this.citaEtapaSelect = value;
    }
    this.applyFilters(false);
  }

  updateCounts(): void {
    this.eventManager.broadcast(new JhiEventWithContent('update-count-bandejas', undefined));
  }

  joinVideoStream(id?: number): void {
    this.router.navigate(['/agora', id]);
  }
}
