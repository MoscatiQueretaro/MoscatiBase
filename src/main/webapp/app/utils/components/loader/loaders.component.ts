import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { isUndefined } from 'webpack-merge/dist/utils';

@Component({
  selector: 'jhi-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.styles.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 1 }),
        animate(0, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeInOutContent', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 1 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(0, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
/**
 * Componente que contiene distintos tipos de loaders, ejemplos de uso
 * Ejemplo de uso de componente para loader de tabla
 * <div class="row">
 *     <div class="col-12" style="position: absolute; z-index: 1;">
 *         <jhi-loaders [buttons]="true" [rows]="6" [type]="'table'" [show]="loading"></jhi-loaders>
 *     </div>
 * </div>
 * Ejemplo de uso de componente para loader animado, si textToShow no se define se mostrara cargando
 * <div class="col-12 center-items">
 *     <jhi-loaders [type]="'loader'" [textToShow]="'Cargando'" [show]="true"></jhi-loaders>
 * </div>
 */
export class LoadersComponent implements OnInit {
  @Input() rows?: number;
  @Input() space?: boolean;
  @Input() image?: boolean;
  @Input() buttons?: boolean;
  @Input() type?: string;
  @Input() styleLoader: any;
  @Input() styleTable: any;
  @Input() errortextToShow?: string;
  @Input() showError?: boolean;
  @Input() showAnimation?: boolean;
  @Input() styleText: any;
  @Input() typeLoader?: string;
  containerClass: any;
  typeOptions = ['table', 'loader'];
  styleGradient = {};
  styleButtons = {};
  _rows: any;
  _textToShow = '';
  showContent?: boolean;
  _show = false;
  @Input() svgConfig: any;

  public lottieConfig: any;
  /* eslint-disable */
  constructor() {
    this.lottieConfig = {
      animationData: require('../../../../content/lottie/printer.json'),
      autoplay: true,
      loop: true,
    };
  }

  @Input()
  get show(): boolean {
    return this._show;
  }

  set show(value: boolean) {
    this._show = value;
    if (!value) {
      setTimeout(() => {
        this.showContent = true;
      }, 300);
    } else {
      this.showContent = !this._show;
    }
  }

  @Input()
  get textToShow(): string {
    return this._textToShow;
  }

  set textToShow(value: string) {
    this._textToShow = value;
  }

  /* eslint-disable */
  ngOnInit(): void {
    if (isUndefined(this._show) || this._show === null) {
      this._show = false;
    }
    this.showContent = !this._show;
    if (!this.rows) {
      this._rows = new Array(3);
    } else {
      this._rows = new Array(this.rows);
    }

    if (!this._textToShow) {
      this._textToShow = 'Cargando';
    }

    if (!this.errortextToShow) {
      this.errortextToShow = '';
    }

    this.space = this.space ? true : false;
    this.image = this.image ? true : false;
    this.buttons = this.buttons ? true : false;

    if (!this.type) {
      this.type = 'table';
    } else {
      if (!this.typeOptions.indexOf(this.type)) {
        this.type = 'table';
      }
    }

    if (this.type === 'table') {
      const wtr = 0 + (this.space ? 20 : 0) + (this.image ? 60 : 0);

      if (this.buttons) {
        this.styleButtons = { width: 'calc(calc(100% - ' + wtr + 'px) * 0.2)' };
        this.styleGradient = { width: 'calc(calc(100% - ' + wtr + 'px) * 0.8)' };
      } else {
        this.styleGradient = { width: 'calc(100% - ' + wtr + 'px)' };
        this.styleButtons = {};
      }
    } else if (this.type === 'loader' || this.type === 'lottie') {
      switch (this.typeLoader) {
        case 'fixed':
          this.containerClass = 'ssc-loader-container-fixed';
          break;
        case 'absolute':
          this.containerClass = 'ssc-loader-container-absolute';
          break;
        default:
          this.containerClass = '';
      }
    }
  }

  getAnimation(animation: any): void {
    if (!isUndefined(this.svgConfig) && this.svgConfig !== null) {
      if (!isUndefined(animation) && animation !== null) {
        if (!isUndefined(this.svgConfig.viewBox) && this.svgConfig.viewBox !== null) {
          animation.renderer.svgElement.setAttribute('viewBox', this.svgConfig.viewBox);
        }
      }
    }
  }
}
