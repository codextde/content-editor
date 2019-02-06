import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/services/event.service';
import { PxPercentage } from '../../enums/px-percentage.enum';


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
  width = 'width.px';
  widthUnit: string = '%';
  faInfoCircle = faInfoCircle;

  general: any = {};
  center: boolean;

  constructor(private eventsService: EventsService) {}


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.general = value;
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
    console.log(this.general);

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

    console.log(this.general);
  }
}
