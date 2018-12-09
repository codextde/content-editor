import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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

  padding: IPaddingProperty = {
    left: '0px',
    top: '0px',
    right: '0px',
    bottom: '0px'
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