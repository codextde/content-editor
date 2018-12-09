import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-property-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => HtmlPropertyComponent),
       multi: true
  }]
})
export class HtmlPropertyComponent implements ControlValueAccessor {

  html: any = {
    value: '<div></div>'
  };
  htmlOptions = {theme: 'vs-dark', language: 'html'};



  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.html = value;
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
