import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-property-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => JavascriptPropertyComponent),
       multi: true
  }]
})
export class JavascriptPropertyComponent  implements ControlValueAccessor {

  javascript: string = 'function x() {\n  console.log("Hello world!");\n}';
  javascriptOptions = {theme: 'vs-dark', language: 'javascript'};



  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.javascript = value;
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
