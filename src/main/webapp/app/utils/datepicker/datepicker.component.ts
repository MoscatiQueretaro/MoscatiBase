import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'app/utils/dom/domhandler';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true,
};

export interface LocaleSettings {
  firstDayOfWeek?: number;
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
  today: string;
  clear: string;
  dateFormat?: string;
  weekHeader?: string;
}

@Component({
  selector: 'jhi-date-picker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.styles.scss'],
  animations: [
    trigger('overlayAnimation', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'visibleTouchUI',
        style({
          transform: 'translate(-50%,-50%)',
          opacity: 1,
        })
      ),
      transition('void => visible', [style({ transform: 'translateY(-5%)', opacity: 0 }), animate('{{showTransitionParams}}')]),
      transition('visible => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            opacity: 0,
            transform: 'translateY(-5%)',
          })
        ),
      ]),
      transition('void => visibleTouchUI', [
        style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
        animate('{{showTransitionParams}}'),
      ]),
      transition('visibleTouchUI => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            opacity: 0,
            transform: 'translate3d(-50%, -40%, 0) scale(0.9)',
          })
        ),
      ]),
    ]),
  ],
  providers: [CALENDAR_VALUE_ACCESSOR],
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor, AfterContentInit {
  /* eslint-disable */

  @Input() defaultDate?: Date;

  @Input() style: any;

  @Input() dateTimeMode?: boolean;

  @Input() enableEspecificDays?: String[];

  @Input() styleClass?: string;

  @Input() inputStyle: any;

  @Input() inputId?: string;

  @Input() name?: string;

  @Input() inputStyleClass?: string;

  @Input() placeholder?: string;

  @Input() disabled: any;

  @Input() dateFormat = 'dd/mm/yy';

  @Input() multipleSeparator = ',';

  @Input() rangeSeparator = '-';

  @Input() inline = false;

  @Input() showOtherMonths = true;

  @Input() selectOtherMonths?: boolean;

  @Input() appendTo: any;

  @Input() readonlyInput?: boolean;

  @Input() shortYearCutoff: any = '+10';

  @Input() monthNavigator?: boolean;

  @Input() yearNavigator?: boolean;

  @Input() hourFormat = '24';

  @Input() timeOnly?: boolean;

  @Input() stepHour = 1;

  @Input() stepMinute = 1;

  @Input() stepSecond = 1;

  @Input() showSeconds = false;

  @Input() required?: boolean;

  @Input() showOnFocus = true;

  @Input() showWeek = false;

  @Input() dataType = 'date';

  @Input() selectionMode = 'single';

  @Input() maxDateCount?: number;

  @Input() showButtonBar?: boolean;

  @Input() todayButtonStyleClass = 'ui-button-secondary';

  @Input() clearButtonStyleClass = 'ui-button-secondary';

  @Input() autoZIndex = true;

  @Input() baseZIndex = 0;

  @Input() panelStyleClass?: string;

  @Input() panelStyle = {
    display: 'block',
  };

  @Input() keepInvalid = false;

  @Input() hideOnDateTimeSelect = false;

  @Input() numberOfMonths = 1;

  @Input() view = 'date';

  @Input() touchUI?: boolean;

  @Input() timeSeparator = ':';

  @Input() showTransitionOptions = '225ms ease-out';

  @Input() hideTransitionOptions = '195ms ease-in';

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @Output() onInput: EventEmitter<any> = new EventEmitter();

  @Output() onTodayClick: EventEmitter<any> = new EventEmitter();

  @Output() onClearClick: EventEmitter<any> = new EventEmitter();

  @Output() onMonthChange: EventEmitter<any> = new EventEmitter();

  @Output() onYearChange: EventEmitter<any> = new EventEmitter();

  @ContentChildren(PrimeTemplate) templates?: QueryList<any>;

  @Input() placeHolderLabel?: string;

  _locale: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: [
      'calendar.days.sunday',
      'calendar.days.monday',
      'calendar.days.tuesday',
      'calendar.days.wednesday',
      'calendar.days.thursday',
      'calendar.days.friday',
      'calendar.days.saturday',
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'mm-dd-yyyy',
    weekHeader: 'Sem',
  };

  @Input() tabindex?: number;

  @ViewChild('inputfield', { static: false }) inputfieldViewChild?: ElementRef;

  value: any;

  dates?: any[];

  months?: any[];

  monthPickerValues?: any[];

  weekDays?: string[];

  currentMonth?: number;

  currentYear?: number;

  currentHour?: number;

  currentMinute?: number;

  currentSecond?: number;

  pm?: boolean;

  mask?: HTMLDivElement;

  maskClickListener?: Function;

  overlay?: HTMLDivElement;

  overlayVisible?: boolean;

  calendarElement: any;

  timePickerTimer: any;

  documentClickListener: any;

  ticksTo1970?: number;

  yearOptions?: number[];

  focus?: boolean;

  isKeydown?: boolean;

  filled?: boolean;

  inputFieldValue?: string;

  _minDate?: Date;

  _maxDate?: Date;

  _showTime?: boolean;

  _yearRange?: string;

  preventDocumentListener?: boolean;

  dateTemplate?: TemplateRef<any> | null;

  _disabledDates?: Array<Date>;

  _disabledDays?: Array<number>;

  selectElement: any;

  todayElement: any;

  focusElement: any;

  documentResizeListener: any;

  private _utc?: boolean;

  @Input() get utc(): boolean | undefined {
    return this._utc;
  }
  set utc(_utc: boolean | undefined) {
    this._utc = _utc;
  }

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    public cd: ChangeDetectorRef,
    private zone: NgZone,
    private domHandler: DomHandler
  ) {}

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  @Input() get minDate(): Date | undefined {
    return this._minDate;
  }

  set minDate(date: Date | undefined) {
    this._minDate = date;

    if (this.currentMonth !== undefined && this.currentYear !== undefined) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get maxDate(): Date | undefined {
    return this._maxDate;
  }

  set maxDate(date: Date | undefined) {
    this._maxDate = date;

    if (this.currentMonth !== undefined && this.currentYear !== undefined) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDates(): Date[] | undefined {
    return this._disabledDates;
  }

  set disabledDates(disabledDates: Date[] | undefined) {
    this._disabledDates = disabledDates;
    if (this.currentMonth !== undefined && this.currentYear !== undefined) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDays(): number[] | undefined {
    return this._disabledDays;
  }

  set disabledDays(disabledDays: number[] | undefined) {
    this._disabledDays = disabledDays;

    if (this.currentMonth !== undefined && this.currentYear !== undefined) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get yearRange(): string | undefined {
    return this._yearRange;
  }

  set yearRange(yearRange: string | undefined) {
    this._yearRange = yearRange;

    if (this.yearNavigator && yearRange) {
      const years = yearRange.split(':');
      const yearStart = Number(years[0]);
      const yearEnd = Number(years[1]);

      this.populateYearOptions(yearStart, yearEnd);
    }
  }

  @Input() get showTime(): boolean | undefined {
    return this._showTime;
  }

  set showTime(showTime: boolean | undefined) {
    this._showTime = showTime;

    if (this.currentHour === undefined) {
      this.initTime(this.value || new Date());
    }
    this.updateInputfield();
  }

  get locale(): LocaleSettings {
    return this._locale;
  }

  @Input()
  set locale(newLocale: LocaleSettings) {
    this._locale = newLocale;

    if (this.view === 'date') {
      this.createWeekDays();
      this.createMonths(this.currentMonth, this.currentYear);
    } else if (this.view === 'month') {
      this.createMonthPickerValues();
    }
  }

  ngOnInit(): void {
    const date = this.defaultDate || new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    if (this.view === 'date') {
      this.createWeekDays();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
      this.ticksTo1970 =
        ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
    } else if (this.view === 'month') {
      this.createMonthPickerValues();
    }
  }

  ngAfterContentInit(): void {
    if (this.templates) {
      this.templates.forEach(item => {
        switch (item.getType()) {
          case 'date':
            this.dateTemplate = item.template;
            break;

          default:
            this.dateTemplate = item.template;
            break;
        }
      });
    }
  }

  populateYearOptions(start: number, end: number): void {
    this.yearOptions = [];

    for (let i = start; i <= end; i++) {
      this.yearOptions.push(i);
    }
  }

  createWeekDays(): void {
    this.weekDays = [];
    let dayIndex = this.locale.firstDayOfWeek || 0;
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(this.locale.dayNames[dayIndex]);
      dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
    }
  }

  createMonthPickerValues(): void {
    this.monthPickerValues = [];
    for (let i = 0; i <= 11; i++) {
      this.monthPickerValues.push(this.locale.monthNamesShort[i]);
    }
  }

  createMonths(month?: number, year?: number): void {
    this.months = this.months = [];
    for (let i = 0; i < this.numberOfMonths; i++) {
      let m = month ? month + i : i;
      let y = year ? year : 0;
      if (m > 11) {
        m = (m % 11) - 1;
        y = year ? year + 1 : 1;
      }

      this.months.push(this.createMonth(m, y));
    }
  }

  getWeekNumber(date: Date): number {
    const checkDate = new Date(date.getTime());
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    const time = checkDate.getTime();
    checkDate.setMonth(0);
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
  }

  createMonth(monthVar: number, yearVar: number): object {
    const datesVar = [];
    const firstDay = this.getFirstDayOfMonthIndex(monthVar, yearVar);
    const daysLength = this.getDaysCountInMonth(monthVar, yearVar);
    const prevMonthDaysLength = this.getDaysCountInPrevMonth(monthVar, yearVar);
    let dayNo = 1;
    const today = new Date();
    const weekNumbersVar = [];
    const monthRows = Math.ceil((daysLength + firstDay) / 7);

    for (let i = 0; i < monthRows; i++) {
      const week = [];

      if (i === 0) {
        for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
          const prev = this.getPreviousMonthAndYear(monthVar, yearVar);
          week.push({
            day: j,
            month: prev.month,
            year: prev.year,
            otherMonth: true,
            today: this.isToday(today, j, prev.month, prev.year),
            selectable: this.isSelectable(j, prev.month, prev.year, true),
          });
        }

        const remainingDaysLength = 7 - week.length;
        for (let j = 0; j < remainingDaysLength; j++) {
          week.push({
            day: dayNo,
            month: monthVar,
            year: yearVar,
            today: this.isToday(today, dayNo, monthVar, yearVar),
            selectable: this.isSelectable(dayNo, monthVar, yearVar, false),
          });
          dayNo++;
        }
      } else {
        for (let j = 0; j < 7; j++) {
          if (dayNo > daysLength) {
            const next = this.getNextMonthAndYear(monthVar, yearVar);
            week.push({
              day: dayNo - daysLength,
              month: next.month,
              year: next.year,
              otherMonth: true,
              today: this.isToday(today, dayNo - daysLength, next.month, next.year),
              selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true),
            });
          } else {
            week.push({
              day: dayNo,
              month: monthVar,
              year: yearVar,
              today: this.isToday(today, dayNo, monthVar, yearVar),
              selectable: this.isSelectable(dayNo, monthVar, yearVar, false),
            });
          }

          dayNo++;
        }
      }

      if (this.showWeek) {
        weekNumbersVar.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
      }

      datesVar.push(week);
    }

    return {
      month: monthVar,
      year: yearVar,
      dates: datesVar,
      weekNumbers: weekNumbersVar,
    };
  }

  initTime(date: Date): void {
    this.pm = date.getHours() > 11;

    if (this.showTime) {
      this.currentMinute = 0;
      this.currentSecond = date.getSeconds();

      if (this.hourFormat === '12') {
        this.currentHour = date.getHours() === 0 ? 12 : date.getHours() % 12;
      } else {
        this.currentHour = date.getHours();
      }
    } else if (this.timeOnly) {
      this.currentMinute = 0;
      this.currentHour = 0;
      this.currentSecond = 0;
    }
  }

  navBackward(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.view === 'month') {
      this.decrementYear();
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.decrementYear();
      } else if (this.currentMonth !== undefined) {
        this.currentMonth--;
      }
      const currMonth = this.currentMonth !== undefined ? this.currentMonth + 1 : 1;
      this.onMonthChange.emit({ month: currMonth, year: this.currentYear });
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  navForward(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.view === 'month') {
      this.incrementYear();
    } else {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.incrementYear();
      } else if (this.currentMonth !== undefined) {
        this.currentMonth++;
      }
      const currMonth = this.currentMonth !== undefined ? this.currentMonth + 1 : 1;
      this.onMonthChange.emit({ month: currMonth, year: this.currentYear });
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  decrementYear(): void {
    if (this.currentYear) {
      this.currentYear--;
    }

    if (this.yearNavigator && this.currentYear && this.yearOptions && this.currentYear < this.yearOptions[0]) {
      const difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
    }
  }

  incrementYear(): void {
    if (this.currentYear) {
      this.currentYear++;
    }

    if (this.yearNavigator && this.currentYear && this.yearOptions && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
      const difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
    }
  }

  onDateSelect(event: Event, dateMeta: any): void {
    if (this.disabled || !dateMeta.selectable) {
      event.preventDefault();
      return;
    }

    if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
      this.value = this.value.filter((date: Date) => {
        return !this.isDateEquals(date, dateMeta);
      });
      this.updateModel(this.value);
    } else {
      if (this.shouldSelectDate()) {
        if (dateMeta.otherMonth) {
          this.currentMonth = dateMeta.month;
          this.currentYear = dateMeta.year;
          this.createMonths(this.currentMonth, this.currentYear);
          this.selectDate(dateMeta);
        } else {
          this.selectDate(dateMeta);
        }
      }
    }

    if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
      setTimeout(() => {
        event.preventDefault();
        this.hideOverlay();

        if (this.mask) {
          this.disableModality();
        }

        this.cd.markForCheck();
      }, 150);
    }

    this.updateInputfield();
    event.preventDefault();
  }

  shouldSelectDate(): boolean {
    if (this.isMultipleSelection()) {
      return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
    } else {
      return true;
    }
  }

  onMonthSelect(event: Event, index: number): void {
    this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
  }

  updateInputfield(): void {
    let formattedValue = '';

    if (this.value) {
      if (this.isSingleSelection()) {
        formattedValue = this.formatDateTime(this.value) || '';
      } else if (this.isMultipleSelection()) {
        for (let i = 0; i < this.value.length; i++) {
          const dateAsString = this.formatDateTime(this.value[i]);
          formattedValue += dateAsString;
          if (i !== this.value.length - 1) {
            formattedValue += this.multipleSeparator + ' ';
          }
        }
      } else if (this.isRangeSelection()) {
        if (this.value && this.value.length) {
          const startDate = this.value[0];
          const endDate = this.value[1];

          formattedValue = this.formatDateTime(startDate) || '';
          if (endDate) {
            formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
          }
        }
      }
    }

    this.inputFieldValue = formattedValue;
    this.updateFilledState();
    if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
      this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
    }
  }

  formatDateTime(date: Date): string {
    let formattedValue = '';
    if (date) {
      if (this.timeOnly) {
        formattedValue = this.formatTime(date);
      } else {
        const format = this.getDateFormat() || '';
        formattedValue = this.formatDate(date, format) || '';
        if (this.showTime) {
          formattedValue += ' ' + this.formatTime(date);
        }
      }
    }

    return formattedValue;
  }

  selectDate(dateMeta: any): void {
    let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);

    if (this.showTime) {
      if (this.hourFormat === '12') {
        if (this.currentHour === 12) {
          date.setHours(this.pm ? 12 : 0);
        } else if (this.currentHour) {
          date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
      } else if (this.currentHour) {
        date.setHours(this.currentHour);
      }
      if (this.currentMinute) {
        date.setMinutes(this.currentMinute);
      }
      if (this.currentSecond) {
        date.setSeconds(this.currentSecond);
      }
    }

    if (this.minDate && this.minDate > date) {
      date = this.minDate;
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
    }

    if (this.maxDate && this.maxDate < date) {
      date = this.maxDate;
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
    }

    if (this.isSingleSelection()) {
      this.updateModel(date);
    } else if (this.isMultipleSelection()) {
      this.updateModel(this.value ? [...this.value, date] : [date]);
    } else if (this.isRangeSelection()) {
      if (this.value && this.value.length) {
        let startDate = this.value[0];
        let endDate = this.value[1];

        if (!endDate && date.getTime() >= startDate.getTime()) {
          endDate = date;
        } else {
          startDate = date;
          endDate = null;
        }

        this.updateModel([startDate, endDate]);
      } else {
        this.updateModel([date, null]);
      }
    }

    this.onSelect.emit(date);
  }

  updateModel(value: any): void {
    this.value = value;

    if (this.dataType === 'date') {
      this.onModelChange(this.value);
    } else if (this.dataType === 'string') {
      if (this.isSingleSelection()) {
        this.onModelChange(this.formatDateTime(this.value));
      } else {
        let stringArrValue = null;
        if (this.value) {
          stringArrValue = this.value.map((date: any) => this.formatDateTime(date));
        }
        this.onModelChange(stringArrValue);
      }
    }
  }

  getFirstDayOfMonthIndex(month: number, year: number): number {
    const day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    const dayIndex = day.getDay() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  getDaysCountInMonth(month: number, year: number): number {
    const date = this.daylightSavingAdjust(new Date(year, month, 32));
    return date ? 32 - date.getDate() : 32;
  }

  getDaysCountInPrevMonth(month: number, year: number): number {
    const prev = this.getPreviousMonthAndYear(month, year);
    return this.getDaysCountInMonth(prev.month, prev.year);
  }

  getPreviousMonthAndYear(month: number, year: number): any {
    let m, y;

    if (month === 0) {
      m = 11;
      y = year - 1;
    } else {
      m = month - 1;
      y = year;
    }

    return { month: m, year: y };
  }

  getNextMonthAndYear(month: number, year: number): any {
    let m, y;

    if (month === 11) {
      m = 0;
      y = year + 1;
    } else {
      m = month + 1;
      y = year;
    }

    return { month: m, year: y };
  }

  getSundayIndex(): number {
    return this.locale && this.locale.firstDayOfWeek && this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
  }

  isSelected(dateMeta: any): boolean {
    if (this.value) {
      if (this.isSingleSelection()) {
        return this.isDateEquals(this.value, dateMeta);
      } else if (this.isMultipleSelection()) {
        let selected = false;
        for (const date of this.value) {
          selected = this.isDateEquals(date, dateMeta);
          if (selected) {
            break;
          }
        }

        return selected;
      } else if (this.isRangeSelection()) {
        if (this.value[1]) {
          return (
            this.isDateEquals(this.value[0], dateMeta) ||
            this.isDateEquals(this.value[1], dateMeta) ||
            this.isDateBetween(this.value[0], this.value[1], dateMeta)
          );
        } else {
          return this.isDateEquals(this.value[0], dateMeta);
        }
      }
    }
    return false;
  }

  isMonthSelected(monthVar: number): boolean {
    const dayVar = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
    return this.isSelected({ year: this.currentYear, month: monthVar, day: dayVar, selectable: true });
  }

  isDateEquals(value: any, dateMeta: any): boolean {
    if (value) {
      return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
    }
    return false;
  }

  isDateBetween(start: Date, end: Date, dateMeta: any): boolean {
    const between = false;
    if (start && end) {
      const date: Date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
    }

    return between;
  }

  isSingleSelection(): boolean {
    return this.selectionMode === 'single';
  }

  isRangeSelection(): boolean {
    return this.selectionMode === 'range';
  }

  isMultipleSelection(): boolean {
    return this.selectionMode === 'multiple';
  }

  isToday(today: Date, day: number, month: number, year: number): boolean {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  }

  isSelectable(day: number, month: number, year: number, otherMonth: boolean): boolean {
    let validMin = true;
    let validMax = true;
    let validDate = true;
    let validDay = true;

    if (otherMonth && !this.selectOtherMonths) {
      return false;
    }

    if (this.minDate) {
      if (this.minDate.getFullYear() > year) {
        validMin = false;
      } else if (this.minDate.getFullYear() === year) {
        if (this.minDate.getMonth() > month) {
          validMin = false;
        } else if (this.minDate.getMonth() === month) {
          if (this.minDate.getDate() > day) {
            validMin = false;
          }
        }
      }
    }

    if (this.maxDate) {
      if (this.maxDate.getFullYear() < year) {
        validMax = false;
      } else if (this.maxDate.getFullYear() === year) {
        if (this.maxDate.getMonth() < month) {
          validMax = false;
        } else if (this.maxDate.getMonth() === month) {
          if (this.maxDate.getDate() < day) {
            validMax = false;
          }
        }
      }
    }

    if (this.disabledDates) {
      validDate = !this.isDateDisabled(day, month, year);
    }

    if (this.disabledDays) {
      validDay = !this.isDayDisabled(day, month, year);
    }

    return validMin && validMax && validDate && validDay;
  }

  isDateDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDates) {
      for (const disabledDate of this.disabledDates) {
        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
          return true;
        }
      }
    }

    return false;
  }

  isDayDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDays) {
      const weekday = new Date(year, month, day);
      const weekdayNumber = weekday.getDay();
      return this.disabledDays.includes(weekdayNumber);
    }
    return false;
  }

  onInputFocus(event: Event): void {
    this.focus = true;
    if (this.showOnFocus) {
      this.showOverlay();
    }
    this.onFocus.emit(event);
  }

  onInputClick(): void {
    if (this.overlay && this.autoZIndex) {
      this.overlay.style.zIndex = String(this.baseZIndex + ++DomHandler.zindex);
    }
    if (this.showOnFocus && !this.overlayVisible) {
      this.showOverlay();
    }
  }

  onInputBlur(event: Event): void {
    this.focus = false;
    this.onBlur.emit(event);
    if (!this.keepInvalid) {
      this.updateInputfield();
    }
    this.onModelTouched();
  }

  onButtonClick(event: Event, inputField: HTMLElement): void {
    if (!this.overlayVisible) {
      inputField.focus();
      this.showOverlay();
    } else {
      this.hideOverlay();
    }
  }

  onInputKeydown(event: KeyboardEvent): void {
    this.isKeydown = true;
    if (event.keyCode === 9) {
      this.hideOverlay();
    }
  }

  onMonthDropdownChange(m: Event): void {
    const inp = m.target as HTMLInputElement;
    this.currentMonth = Number(inp.value);
    this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
    this.createMonths(this.currentMonth, this.currentYear);
  }

  onYearDropdownChange(y: Event): void {
    const inp = y.target as HTMLInputElement;
    this.currentYear = Number(inp.value);
    const currMonth = this.currentMonth !== undefined ? this.currentMonth + 1 : 1;
    this.onYearChange.emit({ month: currMonth, year: this.currentYear });
    this.createMonths(this.currentMonth, this.currentYear);
  }

  incrementHour(event: Event): void {
    const prevHour = this.currentHour || 0;
    const newHour = this.currentHour ? this.currentHour + this.stepHour : this.stepHour;

    if (this.validateHour(newHour)) {
      if (this.hourFormat === '24') {
        this.currentHour = newHour >= 24 ? newHour - 24 : newHour;
      } else if (this.hourFormat === '12') {
        // Before the AM/PM break, now after
        if (prevHour < 12 && newHour > 11) {
          this.pm = !this.pm;
        }

        this.currentHour = newHour >= 13 ? newHour - 12 : newHour;
      }
    }
    event.preventDefault();
  }

  onTimePickerElementMouseDown(event: Event, type: number, direction: number): void {
    if (!this.disabled) {
      this.repeat(event, undefined, type, direction);
      event.preventDefault();
    }
  }

  onTimePickerElementMouseUp(): void {
    if (!this.disabled) {
      this.clearTimePickerTimer();
      this.updateTime();
    }
  }

  repeat(event: Event, interval: number | undefined, type: number, direction: number): void {
    const i = interval || 500;

    this.clearTimePickerTimer();
    this.timePickerTimer = setTimeout(() => {
      this.repeat(event, 100, type, direction);
    }, i);

    switch (type) {
      case 0:
        if (direction === 1) {
          this.incrementHour(event);
        } else {
          this.decrementHour(event);
        }
        break;

      case 1:
        if (direction === 1) {
          this.incrementMinute(event);
        } else {
          this.decrementMinute(event);
        }
        break;

      case 2:
        if (direction === 1) {
          this.incrementSecond(event);
        } else {
          this.decrementSecond(event);
        }
        break;
    }

    this.updateInputfield();
  }

  clearTimePickerTimer(): void {
    if (this.timePickerTimer) {
      clearInterval(this.timePickerTimer);
    }
  }

  decrementHour(event: Event): void {
    const newHour = this.currentHour ? this.currentHour - this.stepHour : this.stepHour;

    if (this.validateHour(newHour)) {
      if (this.hourFormat === '24') {
        this.currentHour = newHour < 0 ? 24 + newHour : newHour;
      } else if (this.hourFormat === '12') {
        // If we were at noon/midnight, then switch
        if (this.currentHour === 12) {
          this.pm = !this.pm;
        }
        this.currentHour = newHour <= 0 ? 12 + newHour : newHour;
      }
    }

    event.preventDefault();
  }

  validateHour(hour: number): boolean {
    let valid = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    const valueDateString = value ? value.toDateString() : null;

    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (this.minDate.getHours() > hour) {
        valid = false;
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (this.maxDate.getHours() < hour) {
        valid = false;
      }
    }

    return valid;
  }

  incrementMinute(event: Event): void {
    const newMinute = this.currentMinute ? this.currentMinute + this.stepMinute : this.stepMinute;
    if (this.validateMinute(newMinute)) {
      this.currentMinute = newMinute > 59 ? newMinute - 60 : newMinute;
    }

    event.preventDefault();
  }

  decrementMinute(event: Event): void {
    let newMinute = this.currentMinute ? this.currentMinute - this.stepMinute : this.stepMinute;
    newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
    if (this.validateMinute(newMinute)) {
      this.currentMinute = newMinute;
      console.warn(this.currentMinute);
    }

    event.preventDefault();
  }

  validateMinute(minute: number): boolean {
    let valid = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    const valueDateString = value ? value.toDateString() : null;
    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (value.getHours() === this.minDate.getHours()) {
        if (this.minDate.getMinutes() > minute) {
          valid = false;
        }
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (value.getHours() === this.maxDate.getHours()) {
        if (this.maxDate.getMinutes() < minute) {
          valid = false;
        }
      }
    }

    return valid;
  }

  incrementSecond(event: Event): void {
    const newSecond = this.currentSecond ? this.currentSecond + this.stepSecond : this.stepSecond;
    if (this.validateSecond(newSecond)) {
      this.currentSecond = newSecond > 59 ? newSecond - 60 : newSecond;
    }

    event.preventDefault();
  }

  decrementSecond(event: Event): void {
    let newSecond = this.currentSecond ? this.currentSecond - this.stepSecond : this.stepSecond;
    newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
    if (this.validateSecond(newSecond)) {
      this.currentSecond = newSecond;
    }

    event.preventDefault();
  }

  validateSecond(second: number): boolean {
    let valid = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    const valueDateString = value ? value.toDateString() : null;

    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (this.minDate.getSeconds() > second) {
        valid = false;
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (this.maxDate.getSeconds() < second) {
        valid = false;
      }
    }

    return valid;
  }

  updateTime(): void {
    let value = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    value = value ? new Date(value.getTime()) : new Date();

    if (this.hourFormat === '12') {
      if (this.currentHour === 12) {
        value.setHours(this.pm ? 12 : 0);
      } else if (this.currentHour) {
        value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      }
    } else if (this.currentHour) {
      value.setHours(this.currentHour);
    }
    console.warn('after update minute:', this.currentMinute);

    if (this.currentMinute !== undefined) {
      console.warn('update minute:', this.currentMinute);
      value.setMinutes(this.currentMinute);
    }
    if (this.currentSecond) {
      value.setSeconds(this.currentSecond);
    }
    if (this.isRangeSelection()) {
      if (this.value[1]) {
        value = [this.value[0], value];
      } else {
        value = [value, null];
      }
    }

    if (this.isMultipleSelection()) {
      value = [...this.value.slice(0, -1), value];
    }

    this.updateModel(value);
    this.onSelect.emit(value);
    this.updateInputfield();
  }

  toggleAMPM(event: Event): void {
    this.pm = !this.pm;
    this.updateTime();
    event.preventDefault();
  }

  onUserInput(event: Event): void {
    // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
    if (!this.isKeydown) {
      return;
    }
    this.isKeydown = false;
    const target = event.target as HTMLInputElement;
    const val = target.value;
    try {
      const value = this.parseValueFromString(val);
      if (this.isValidSelection(value)) {
        this.updateModel(value);
        this.updateUI();
      }
    } catch (err) {
      // invalid date
      this.updateModel(null);
    }

    this.filled = val != null && !!val.length;
    this.onInput.emit(event);
  }

  isValidSelection(value: any): boolean {
    let isValid = true;
    if (this.isSingleSelection()) {
      if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
        isValid = false;
      }
    } else if (value.every((v: Date) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
      if (this.isRangeSelection()) {
        isValid = value.length > 1 && value[1] > value[0];
      }
    }
    return isValid;
  }

  parseValueFromString(text: string): Date | Date[] | null {
    if (!text || text.trim().length === 0) {
      return null;
    }

    let value: any;

    if (this.isSingleSelection()) {
      value = this.parseDateTime(text);
    } else if (this.isMultipleSelection()) {
      const tokens = text.split(this.multipleSeparator);
      value = [];
      for (const token of tokens) {
        value.push(this.parseDateTime(token.trim()));
      }
    } else if (this.isRangeSelection()) {
      const tokens = text.split(' ' + this.rangeSeparator + ' ');
      value = [];
      for (let i = 0; i < tokens.length; i++) {
        value[i] = this.parseDateTime(tokens[i].trim());
      }
    }

    return value;
  }

  parseDateTime(text: string): Date | string | null {
    let date: Date | string | null;
    const parts: string[] = text.split(' ');

    if (this.timeOnly) {
      date = new Date();
      this.populateTime(date, parts[0], parts[1]);
    } else {
      const dateFormat = this.getDateFormat() || '';
      if (this.showTime) {
        let ampm = this.hourFormat === '12' ? parts.pop() : null;
        ampm = ampm ? ampm : '';
        const timeString = parts.pop() || '';

        date = this.parseDate(parts.join(' '), dateFormat);
        this.populateTime(date, timeString, ampm);
      } else {
        date = this.parseDate(text, dateFormat);
      }
    }

    return date;
  }

  populateTime(value: any, timeString: string, ampm: string): void {
    if (this.hourFormat === '12' && !ampm) {
      throw 'Invalid Time';
    }

    this.pm = ampm === 'PM' || ampm === 'pm';
    const time = this.parseTime(timeString);
    value.setHours(time.hour);
    value.setMinutes(time.minute);
    value.setSeconds(time.second);
  }

  updateUI(): void {
    let val = this.value || this.defaultDate || new Date();
    if (Array.isArray(val)) {
      val = val[0];
    }
    this.currentMonth = val.getMonth();
    this.currentYear = val.getFullYear();
    this.createMonths(this.currentMonth, this.currentYear);

    if (this.showTime || this.timeOnly) {
      const hours = val.getHours();

      if (this.hourFormat === '12') {
        this.pm = hours > 11;

        if (hours >= 12) {
          this.currentHour = hours === 12 ? 12 : hours - 12;
        } else {
          this.currentHour = hours === 0 ? 12 : hours;
        }
      } else {
        this.currentHour = val.getHours();
      }

      this.currentMinute = val.getMinutes();
      this.currentSecond = val.getSeconds();
    }
  }

  showOverlay(): void {
    if (!this.overlayVisible) {
      this.updateUI();
      this.overlayVisible = true;
    }
  }

  hideOverlay(): void {
    this.overlayVisible = false;

    if (this.touchUI) {
      this.disableModality();
    }
  }

  toggle(): void {
    if (!this.inline) {
      if (!this.overlayVisible) {
        this.showOverlay();
        if (this.inputfieldViewChild) {
          this.inputfieldViewChild.nativeElement.focus();
        }
      } else {
        this.hideOverlay();
      }
    }
  }

  onOverlayAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        if (!this.inline) {
          this.overlay = event.element;
          this.appendOverlay();
          if (this.autoZIndex && this.overlay) {
            this.overlay.style.zIndex = String(this.baseZIndex + ++DomHandler.zindex);
          }
          this.alignOverlay();
        }
        break;

      case 'void':
        this.onOverlayHide();
        this.onClose.emit(event);
        break;
    }
  }

  onOverlayAnimationDone(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        if (!this.inline) {
          this.bindDocumentClickListener();
          this.bindDocumentResizeListener();
        }
        break;
    }
  }

  appendOverlay(): void {
    if (this.appendTo) {
      if (this.appendTo === 'body' && this.overlay) {
        document.body.appendChild(this.overlay);
      } else {
        this.domHandler.appendChild(this.overlay, this.appendTo);
      }
    }
  }

  restoreOverlayAppend(): void {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  alignOverlay(): void {
    if (this.touchUI) {
      this.enableModality(this.overlay);
    } else if (this.inputfieldViewChild) {
      if (this.appendTo) {
        this.domHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      } else {
        this.domHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      }
    }
  }

  enableModality(element?: HTMLElement): void {
    if (!this.mask && element) {
      this.mask = document.createElement('div');
      this.mask.style.zIndex = String(Number(element.style.zIndex) - 1);
      const maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
      this.domHandler.addMultipleClasses(this.mask, maskStyleClass);

      this.maskClickListener = this.renderer.listen(this.mask, 'click', () => {
        this.disableModality();
      });
      document.body.appendChild(this.mask);
      this.domHandler.addClass(document.body, 'ui-overflow-hidden');
    }
  }

  disableModality(): void {
    if (this.mask) {
      document.body.removeChild(this.mask);
      const bodyChildren = document.body.children;
      let hasBlockerMasks = false;
      for (let i = 0; i < bodyChildren.length; i++) {
        const bodyChild = bodyChildren[i];
        if (this.domHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
          hasBlockerMasks = true;
          break;
        }
      }

      if (!hasBlockerMasks) {
        this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
      }

      this.unbindMaskClickListener();

      this.mask = undefined;
    }
  }

  unbindMaskClickListener(): void {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = undefined;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.value && typeof this.value === 'string') {
      this.value = this.parseValueFromString(this.value);
    }

    this.updateInputfield();
    this.updateUI();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  getDateFormat(): string | undefined {
    return this.dateFormat || this.locale.dateFormat;
  }

  // Ported from jquery-ui datepicker formatDate
  formatDate(date: Date, format: string): string | null {
    if (!date) {
      return '';
    }

    let iFormat = 0;
    const lookAhead = (match: string) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      formatNumber = (match: string, value: string, len: number) => {
        let num = '' + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      },
      formatName = (match: string, value: any, shortNames: string[], longNames: string[]) => {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
    let output = '';
    let literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', String(date.getDate()), 2);
              break;
            case 'D':
              output += formatName('D', String(date.getDay()), this.locale.dayNamesShort, this.locale.dayNames);
              break;
            case 'o':
              output += formatNumber(
                'o',
                Math.round(
                  (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
                    86400000
                ) + '',
                3
              );
              break;
            case 'm':
              output += formatNumber('m', String(date.getMonth() + 1), 2);
              break;
            case 'M':
              output += formatName('M', String(date.getMonth()), this.locale.monthNamesShort, this.locale.monthNames);
              break;
            case 'y':
              output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
              break;
            case '@':
              output += date.getTime();
              break;
            case '!':
              output += date.getTime() * 10000;
              output += this.ticksTo1970 ? this.ticksTo1970 : 0;
              break;
            case "'":
              if (lookAhead("'")) {
                output += "'";
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
    }
    return output;
  }

  formatTime(date: Date): string {
    if (!date) {
      return '';
    }

    let output = '';
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (this.hourFormat === '12' && hours > 11 && hours !== 12) {
      hours -= 12;
    }

    if (this.hourFormat === '12') {
      output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
    } else {
      output += hours < 10 ? '0' + hours : hours;
    }
    output += ':';
    output += minutes < 10 ? '0' + minutes : minutes;

    if (this.showSeconds) {
      output += ':';
      output += seconds < 10 ? '0' + seconds : seconds;
    }

    if (this.hourFormat === '12') {
      output += date.getHours() > 11 ? ' PM' : ' AM';
    }

    return output;
  }

  parseTime(value: string): any {
    const tokens: string[] = value.split(':');
    const validTokenLength = this.showSeconds ? 3 : 2;

    if (tokens.length !== validTokenLength) {
      throw 'Invalid time';
    }

    let h = Number(tokens[0]);
    const m = Number(tokens[1]);
    const s = this.showSeconds ? Number(tokens[2]) : 0;

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat === '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
      throw 'Invalid time';
    } else {
      if (this.hourFormat === '12') {
        if (h !== 12 && this.pm) {
          h += 12;
        } else if (!this.pm && h === 12) {
          h -= 12;
        }
      }

      return { hour: h, minute: m, second: s };
    }
  }

  // Ported from jquery-ui datepicker parseDate
  parseDate(value: any, format: string): Date | string | null {
    let iFormat = 0,
      dim,
      extra,
      iValue = 0,
      year = -1,
      month = -1,
      day = -1,
      doy = -1,
      literal = false,
      date;

    if (format == null || value == null) {
      throw 'Invalid arguments';
    }

    value = typeof value === 'object' ? value.toString() : value + '';
    if (value === '') {
      return null;
    }
    const shortYearCutoff =
      typeof this.shortYearCutoff !== 'string'
        ? this.shortYearCutoff
        : (new Date().getFullYear() % 100) + parseInt(this.shortYearCutoff, 10);
    const lookAhead = (match: string) => {
      const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
      if (matches) {
        iFormat++;
      }
      return matches;
    };
    const getNumber = (match: string) => {
      const isDoubled = lookAhead(match),
        size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2,
        minSize = match === 'y' ? size : 1,
        digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
        num = value.substring(iValue).match(digits);
      if (!num) {
        throw 'Missing number at position ' + iValue;
      }
      iValue += num[0].length;
      return parseInt(num[0], 10);
    };
    const getName = (match: string, shortNames: string[], longNames: string[]) => {
      let index = -1;
      const arr = lookAhead(match) ? longNames : shortNames;
      const names = [];

      for (let i = 0; i < arr.length; i++) {
        names.push([i, arr[i]]);
      }
      names.sort((a: (string | number)[], b: (string | number)[]) => {
        return -(String(a[1]).length - String(b[1]).length);
      });

      for (let i = 0; i < names.length; i++) {
        const name = String(names[i][1]);
        if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
          index = Number(names[i][0]);
          iValue += name.length;
          break;
        }
      }

      if (index !== -1) {
        return index + 1;
      } else {
        throw 'Unknown name at position ' + iValue;
      }
    };
    const checkLiteral = () => {
      if (value.charAt(iValue) !== format.charAt(iFormat)) {
        throw 'Unexpected literal at position ' + iValue;
      }
      iValue++;
    };

    if (this.view === 'month') {
      day = 1;
    }

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
          literal = false;
        } else {
          checkLiteral();
        }
      } else {
        switch (format.charAt(iFormat)) {
          case 'd': {
            day = getNumber('d');
            break;
          }
          case 'D': {
            getName('D', this.locale.dayNamesShort, this.locale.dayNames);
            break;
          }
          case 'o': {
            doy = getNumber('o');
            break;
          }
          case 'm': {
            month = getNumber('m');
            break;
          }
          case 'M': {
            month = getName('M', this.locale.monthNamesShort, this.locale.monthNames);
            break;
          }
          case 'y': {
            year = getNumber('y');
            break;
          }
          case '@': {
            date = new Date(getNumber('@'));
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          }
          case '!': {
            const ticks = this.ticksTo1970 ? this.ticksTo1970 : 0;
            date = new Date((getNumber('!') - ticks) / 10000);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          }
          case "'": {
            if (lookAhead("'")) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          }
          default: {
            checkLiteral();
          }
        }
      }
    }

    if (iValue < value.length) {
      extra = value.substr(iValue);
      if (!/^\s+/.test(extra)) {
        throw 'Extra/unparsed characters found in date: ' + extra.toString();
      }
    }

    if (year === -1) {
      year = new Date().getFullYear();
    } else if (year < 100) {
      year += new Date().getFullYear() - (new Date().getFullYear() % 100) + (year <= shortYearCutoff ? 0 : -100);
    }
    let wil = true;
    if (doy > -1) {
      month = 1;
      day = doy;
      do {
        dim = this.getDaysCountInMonth(year, month - 1);
        if (day <= dim) {
          break;
        }
        month++;
        day -= dim;
        wil = true;
      } while (wil);
    }

    date = this.daylightSavingAdjust(new Date(year, month - 1, day));
    if (date) {
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw 'Invalid date'; // E.g. 31/02/00
      }
    }

    return date;
  }

  daylightSavingAdjust(date: Date): Date | null {
    if (!date) {
      return null;
    }

    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

    return date;
  }

  updateFilledState(): void {
    this.filled = !!this.inputFieldValue && this.inputFieldValue !== '';
  }

  onTodayButtonClick(event: Event): void {
    const date: Date = new Date();
    const dateMeta = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
      today: true,
      selectable: true,
    };

    this.onDateSelect(event, dateMeta);
    this.onTodayClick.emit(event);
  }

  onClearButtonClick(event: Event): void {
    this.updateModel(null);
    this.updateInputfield();
    this.hideOverlay();
    this.onClearClick.emit(event);
  }

  bindDocumentClickListener(): void {
    if (!this.documentClickListener) {
      this.zone.runOutsideAngular(() => {
        this.documentClickListener = this.renderer.listen('document', 'click', event => {
          if (this.isOutsideClicked(event) && this.overlayVisible) {
            this.zone.run(() => {
              this.hideOverlay();

              this.cd.markForCheck();
            });
          }
        });
      });
    }
  }

  unbindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener(): void {
    if (!this.documentResizeListener && !this.touchUI) {
      this.documentResizeListener = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.documentResizeListener);
    }
  }

  unbindDocumentResizeListener(): void {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  isOutsideClicked(event: Event): boolean {
    return !(
      this.el.nativeElement.isSameNode(event.target) ||
      this.isNavIconClicked(event) ||
      this.el.nativeElement.contains(event.target) ||
      (this.overlay && this.overlay.contains(event.target as Node))
    );
  }

  isNavIconClicked(event: Event): boolean {
    return (
      this.domHandler.hasClass(event.target, 'ui-datepicker-prev') ||
      this.domHandler.hasClass(event.target, 'ui-datepicker-prev-icon') ||
      this.domHandler.hasClass(event.target, 'ui-datepicker-next') ||
      this.domHandler.hasClass(event.target, 'ui-datepicker-next-icon')
    );
  }

  onWindowResize(): void {
    if (this.overlayVisible && !this.domHandler.isAndroid()) {
      this.hideOverlay();
    }
  }

  onOverlayHide(): void {
    this.unbindDocumentClickListener();
    this.unbindMaskClickListener();
    this.unbindDocumentResizeListener();
    this.overlay = undefined;
    this.disableModality();
  }

  ngOnDestroy(): void {
    this.restoreOverlayAppend();
    this.onOverlayHide();
  }
}
