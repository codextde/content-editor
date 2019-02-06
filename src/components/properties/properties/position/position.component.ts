import { Component, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IPositionProperty } from '../../models/position.model';
import { EventsService } from 'src/services/event.service';

@Component({
  selector: 'app-property-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => PositionPropertyComponent),
       multi: true
  }]
})
export class PositionPropertyComponent implements ControlValueAccessor {

  constructor(
    public cdr: ChangeDetectorRef,
    private eventsService: EventsService
  ) {

  }

  faInfoCircle = faInfoCircle;

  position: IPositionProperty = {};
  switch;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.position = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */


  onChange: any = () => {};

  change() {
    this.onChange(this.position);
    this.eventsService.publish('property-change');
  }

  changePosition(value) {
    if (value == 'unset') {
      this.position.top = null;
      this.position.left = null;
    }
    this.position.position = value;
    this.change();
  }

}
