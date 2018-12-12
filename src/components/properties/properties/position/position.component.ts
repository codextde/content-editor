import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IPositionProperty } from '../../models/position.model';

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

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }
  /** NgModel End */


  onChange: any = () => {};


  onTouched = () => {};

  change() {
    this.onChange(this.position);
  }

}
