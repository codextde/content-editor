import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IPaddingProperty } from '../../models/padding.model';
import { IGeneralProperty } from '../../models/general.model';

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

  general: IGeneralProperty = {
    cssClass: '',
    zIndex: 0
  };


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.general = value;
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
