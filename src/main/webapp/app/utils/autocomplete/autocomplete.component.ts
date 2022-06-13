import { Component, Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { BaseEntity } from '../models/base-damner-entity';
import { DomHandler } from '../dom/domhandler';

export const AutocompleteAnimations = [
  trigger('overlayAnimation', [
    state(
      'void',
      style({
        'max-height': '0px',
        opacity: 0,
      })
    ),
    state(
      'visible',
      style({
        'max-height': '{{height}}',
        opacity: 1,
      }),
      { params: { height: '250px' } }
    ),
    transition('void => visible', animate('225ms ease-out')),
    transition('visible => void', animate('195ms ease-in')),
  ]),
];
@Directive()
export class AutocompleteComponent<X extends BaseEntity> implements ControlValueAccessor {
  scrollHeight = '250px';
  field = 'descripcion';
  minLength = 3;
  overlayVisible?: boolean;
  _loading?: boolean;
  _disabled?: boolean;
  _selectedValue?: X = {} as X;
  _inputValue: any;
  _principalArray: X[] = [];
  filteredArray: X[] = [];
  inputKeyDown?: boolean;
  highlightOptionChanged?: boolean;
  overPanel?: boolean;
  containerClass?: string;
  documentListener?: EventListener;
  _labelLegacy?: ElementRef;
  _buttonLegacy = false;
  _legacyStyle = false;
  @Input() placeHolder?: string;
  @Input() placeHolderLabel?: string;
  @ViewChild('container', { static: false }) container?: ElementRef;
  @ViewChild('input', { static: false }) input?: ElementRef;

  constructor(protected renderer: Renderer2, protected domHandler: DomHandler) {
    this.bindDocumentClickListener();
  }

  @ViewChild('labelLegacy', { static: false }) set labelLegacy(el: ElementRef) {
    this._labelLegacy = el;
  }

  @Input('buttonLegacy')
  get buttonLegacy(): boolean {
    return this._buttonLegacy;
  }
  /* eslint-disable */
  set buttonLegacy(value: boolean) {
    if (value !== undefined && value !== null) {
      this._buttonLegacy = value;
    }
  }
  @Input('legacyStyle')
  get legacyStyle(): boolean {
    return this._legacyStyle;
  }
  set legacyStyle(value: boolean) {
    if (value !== undefined && value !== null) {
      this._legacyStyle = value;
    }
  }
  onChange = (_: any) => {
    if (_) {
      _.toString();
    }
  };
  onTouch = () => {};

  get inputVal(): string {
    return this._inputValue;
  }

  set inputVal(val: string) {
    this._inputValue = val;
    if (!this.inputKeyDown) {
      return;
    } else {
      if (val && val.length >= this.minLength) {
        this.filterArray();
        // @ts-ignore
        if (this.filteredArray.length === 1 && String(this.filteredArray[0][this.field]) === val) {
          this.setValue(this.filteredArray[0], true);
          this.overlayVisible = false;
        } else {
          this._selectedValue = undefined;
          this.onChange(null);
          this.overlayVisible = true;
        }
      } else {
        this._selectedValue = undefined;
        this.onChange(null);
        this.filteredArray = [];
        this.overlayVisible = false;
      }
    }
    this.inputKeyDown = false;
  }

  get principalArray(): X[] {
    return this._principalArray;
  }

  set principalArray(val: X[]) {
    let currVal = null;
    if (this._selectedValue) {
      currVal = val.find(e => {
        if (this._selectedValue) {
          return (
            e === this._selectedValue ||
            e.id === this._selectedValue.id ||
            e[this.field as keyof BaseEntity] === this._selectedValue[this.field as keyof BaseEntity]
          );
        }
        return false;
      });
    }
    currVal = currVal ? currVal : undefined;
    this.setValue(currVal);
    this._principalArray = val;
  }

  setValue(value?: X, touched?: boolean): void {
    this._selectedValue = value;
    // @ts-ignore
    this._inputValue = value ? value[this.field] : null;
    if (touched) {
      this.onTouch();
    }
    this.onChange(value);
    this.overlayVisible = false;
  }

  // input events

  onKeyDown(event: KeyboardEvent): void {
    if (this.overlayVisible) {
      const currOpt = this._selectedValue ? this.filteredArray.indexOf(this._selectedValue) : -1;
      switch (event.which) {
        case 40: // down key
          if (currOpt !== -1) {
            const nextItemIndex = currOpt + 1;
            if (nextItemIndex !== this.filteredArray.length) {
              this._selectedValue = this.filteredArray[nextItemIndex];
              this.highlightOptionChanged = true;
            }
          } else {
            this._selectedValue = this.filteredArray[0];
          }
          event.preventDefault();
          break;
        case 38: // up key
          if (currOpt > 0) {
            const prevItemIndex = currOpt - 1;
            this._selectedValue = this.filteredArray[prevItemIndex];
            this.highlightOptionChanged = true;
          }
          event.preventDefault();
          break;
        case 27: // escape key
          this.overlayVisible = false;
          event.preventDefault();
          break;
        case 13: // enter key
        case 9: // tab key
          this.overPanel = false;
          this.onBlur();
          if (event.which === 13) {
            event.preventDefault();
          }
          break;
        default:
          this.inputKeyDown = true;
      }
    } else if (event.which === 40) {
      this.filterArray();
      this.overlayVisible = true;
    } else {
      this.inputKeyDown = true;
    }
  }

  onBlur(): void {
    if (!this.overPanel) {
      if (this._selectedValue) {
        this.setValue(this._selectedValue, false);
        this.containerClass = undefined;
      } else if (!this._inputValue || this._inputValue === '') {
        this.containerClass = undefined;
        this.setValue(undefined, true);
      } else {
        const item = this.findFirstOption(this._inputValue);
        if (item) {
          this.setValue(item, true);
          this.containerClass = undefined;
        } else {
          this.setValue(undefined, true);
          this.containerClass = 'error';
        }
      }
      this.overlayVisible = false;
    }
  }

  // button events
  onDropdownClick(): void {
    if (!this.overlayVisible) {
      this._inputValue = null;
      this.filterArray();
    }
    this.overlayVisible = !this.overlayVisible;
  }

  // animation events
  onOverlayAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.filteredArray = [];
    }
  }

  alignOverlay(event: AnimationEvent): void {
    if (event.toState === 'visible' && this.input) {
      if (this.legacyStyle && this._labelLegacy) {
        this.domHandler.relativePositionLegacy(event.element, this.input.nativeElement, this._labelLegacy.nativeElement);
      } else {
        this.domHandler.relativePosition(event.element, this.input.nativeElement);
      }
    }
  }

  // component functions
  protected compareText(val1: string, val2: string): boolean {
    if (!val1 || !val2) {
      return false;
    }
    const optText = String(val1).toUpperCase();
    // elimina todos los acentos y caracteres especiales ej: á -> a,  ö -> o, ñ -> n
    const normalizedText = optText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return optText.includes(String(val2).toUpperCase()) || normalizedText.includes(String(val2).toUpperCase());
  }

  protected filterArray(): void {
    if (this._inputValue && this._inputValue.length > 0) {
      this.filteredArray = this.principalArray.filter(option => this.compareText(option[this.field as keyof BaseEntity], this._inputValue));
    } else {
      this.filteredArray = this.principalArray;
    }
  }

  protected findFirstOption(value: string): X | undefined {
    if (value && value.length > this.minLength) {
      return this.principalArray.find(option => this.compareText(option[this.field as keyof BaseEntity], value));
    }
    return undefined;
  }

  private isDropdownClick(parent: Element, element: HTMLElement): boolean {
    if (parent === element) {
      return true;
    }
    const children: Element[] = Array.from(parent.children);
    for (let x = 0; x < children.length; x++) {
      if (this.isDropdownClick(children[x], element)) {
        return true;
      }
    }
    return false;
  }

  // reactive form functions
  writeValue(obj: X): void {
    if (obj !== this._selectedValue) {
      if (obj) {
        let currVal = null;
        if (this.principalArray && this.principalArray.length > 0) {
          currVal = this.principalArray.find(e => {
            return e === obj || e.id === obj.id || e[this.field as keyof BaseEntity] === obj[this.field as keyof BaseEntity];
          });
        }
        currVal = currVal ? currVal : obj;
        this.setValue(currVal);
      } else {
        this.setValue(undefined);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  // window listener
  private bindDocumentClickListener(): void {
    if (!this.documentListener) {
      this.documentListener = this.renderer.listen('document', 'click', event => {
        if (event.which === 3) {
          return;
        }
        if (this.container) {
          if (this.overlayVisible && !this.isDropdownClick(this.container.nativeElement, event.target)) {
            this.onBlur();
          }
        }
      });
    }
  }
}
