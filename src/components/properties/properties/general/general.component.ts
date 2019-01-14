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
}
