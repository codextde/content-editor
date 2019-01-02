import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-property-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => CssPropertyComponent),
       multi: true
  }]
})
export class CssPropertyComponent implements ControlValueAccessor {

  css: string =  '.test {\n display: block\n}';
  cssOptions = {theme: 'vs-dark', language: 'css'};

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.css = value;
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
    this.onChange(this.css);
  }

}
