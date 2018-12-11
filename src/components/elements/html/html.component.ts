import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var kendo: any;

@Component({
  selector: 'app-element-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => HtmlElementComponent),
       multi: true
  }]
})
export class HtmlElementComponent implements OnInit, ControlValueAccessor {

  htmlElement;

  padding;
  html;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.htmlElement = value;

      if (!this.padding) {
        this.padding = this.htmlElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }
      if (!this.html) {
        this.html = this.htmlElement.properties.find((property) => {
          return property.name == 'html';
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

  change(ev) {
    this.onChange(this.htmlElement);
  }

  ngOnInit() {

  }

}
