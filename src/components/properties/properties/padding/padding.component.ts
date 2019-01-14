import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventsService } from 'src/services/event.service';
import { IPaddingProperty } from '../../models/padding.model';

@Component({
  selector: 'app-property-padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => PaddingPropertyComponent),
       multi: true
  }]
})
export class PaddingPropertyComponent implements ControlValueAccessor {
  padding: IPaddingProperty = {};

  constructor(
    private eventsService: EventsService
  ) {}

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.padding = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
  }
  registerOnTouched(fn: () => void): void {
  }
  /** NgModel End */

  change() {
    this.eventsService.publish('property-change');
  }

}
