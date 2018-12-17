import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-property-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => MarginPropertyComponent),
       multi: true
  }]
})
export class MarginPropertyComponent implements ControlValueAccessor {




  padding: any = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.padding = value;
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



}
