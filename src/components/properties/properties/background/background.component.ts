import { Component, OnInit, forwardRef } from '@angular/core';
import { IBackgroundProperty } from '../../models/background.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-property-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => BackgroundPropertyComponent),
       multi: true
  }]
})
export class BackgroundPropertyComponent implements ControlValueAccessor {

  background: IBackgroundProperty = {
    color: '#fff',
    image: '',
    repeat: 'no-repeat',
    size: 'cover'
  };

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.background = value;
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
    this.onChange(this.background);
  }

}
