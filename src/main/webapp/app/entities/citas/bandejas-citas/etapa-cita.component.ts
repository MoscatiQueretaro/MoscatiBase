import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import { EtapaCitaModel } from './etapa-cita.model';
import { EtapaCitaService } from '../../catalogos/etapa-cita/etapa-cita.service';
import { UserCitasService } from '../user-citas.service';

@Component({
  selector: 'jhi-bandejas-etapa-cita',
  templateUrl: './etapa-cita.component.html',
  styleUrls: ['./etapa-cita.styles.scss'],
})
export class EtapaCitaComponent implements OnInit {
  allowedIds = ['SOLICITUD', 'CITA', 'CONCLUIDAS', 'CANCELADAS'];
  etapas: EtapaCitaModel[] = [];
  selected = 'SOLICITUD';
  etapaCita: any;

  @Output()
  citaEtapaChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set value(value: string | undefined) {
    if (value && value !== this.selected) {
      this.selected = value;
      this.loadCounts();
    }
  }

  @Input()
  globalParams = {};

  @Input()
  disabled = false;
  private string: any;

  constructor(
    private etapaCitaService: EtapaCitaService,
    private userCitasService: UserCitasService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.loadSituaciones();
    this.subscribeToChanges();
  }

  loadSituaciones(): void {
    this.etapaCitaService.queryActives().subscribe(this.loadSituacionesData.bind(this));
  }

  loadSituacionesData(res: HttpResponse<EtapaCitaModel[]>): void {
    if (res.body) {
      this.etapas = res.body.map(s => Object.assign(new EtapaCitaModel(), s)).filter(sb => this.allowedIds.includes(sb.descripcion!));
      this.loadCounts();
    }
  }

  loadCounts(): void {
    this.etapas.forEach(sb => {
      const params = Object.assign({ 'etapaCita.equals': this.etapaCita }, this.globalParams);
      params['etapaCita.equals'] = sb.descripcion;
      this.userCitasService.countquery(params).subscribe(res => (sb.cantidad = res.body ? res.body : 0));
    });
  }

  selectOne(value: EtapaCitaModel): void {
    this.selected = value.descripcion!;
    this.loadCounts();
    this.citaEtapaChange.emit(this.selected);
  }

  subscribeToChanges(): void {
    this.eventManager.subscribe('update-count-bandejas', this.loadCounts.bind(this));
  }
}
