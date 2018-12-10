import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-element-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => DividerElementComponent),
       multi: true
  }]
})
export class DividerElementComponent implements ControlValueAccessor {

  dividerElement;
  
  padding;
  general;
  divider;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.dividerElement = value;

      if (!this.padding) {
        this.padding = this.dividerElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }

      if (!this.general) {
        this.general = this.dividerElement.properties.find((property) => {
          return property.name == 'general';
        });
      }

      if (!this.divider) {
        this.divider = this.dividerElement.properties.find((property) => {
          return property.name == 'divider';
        });
      }

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
