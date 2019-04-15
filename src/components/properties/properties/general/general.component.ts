import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/services/event.service';


@Component({
  selector: 'app-property-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GeneralPropertyComponent),
    multi: true
  }]
})
export class GeneralPropertyComponent implements ControlValueAccessor {
  width = 'width.%';
  widthUnit: string = '%';
  faInfoCircle = faInfoCircle;

  general: any = {};
  center: boolean;

  constructor(private eventsService: EventsService) {}


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.general = value;
      this.loadCenter();
      for (const key of Object.keys(value)) {
        if (key.startsWith('width')) {
          this.width = key;
          const parts = key.split('.');
          this.widthUnit = parts[parts.length - 1];
        }
      }
    }
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */


  onChange: any = () => {};

  change() {
    this.eventsService.publish('property-change');
  }

  updateCenter() {
    if (!this.general[this.width]) {
      this.center = false;
    }
  }

  loadCenter() {
    if (this.general.margin == '0 auto') {
      this.center = true;
    } else {
      this.center = false;
    }
  }

  changeCenter() {
    if (this.center) {
      this.general.margin = '0 auto';
    } else {
      this.general.margin = null;
    }
    this.change();
  }

  float(float: any) {
    this.general.float = float;
    this.onChange(this.general);
    this.change();
  }

  changeWidthUnit() {
    if (this.widthUnit == 'px') {
      if (this.general['width.%']) {
        this.general['width.px'] = this.general['width.%'];
      }
      delete this.general['width.%'];
      this.width = 'width.px';

    }
    if (this.widthUnit == '%') {
      if (this.general['width.px']) {
        this.general['width.%'] = this.general['width.px'];
      }
      delete this.general['width.px'];
      this.width = 'width.%';
    }

    this.change();
  }
}
