import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IPaddingProperty } from '../../models/padding.model';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss'],
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
