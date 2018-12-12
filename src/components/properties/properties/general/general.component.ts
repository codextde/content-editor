import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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

  faInfoCircle = faInfoCircle;

  general: IGeneralProperty = {
    cssClass: '',
    zIndex: 0,
    float: 'none',
    boxShadow: '',
    center: false
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

  change() {
    this.onChange(this.general);
  }

  float(float) {
    this.general.float = float;
    this.change();
  }
}
