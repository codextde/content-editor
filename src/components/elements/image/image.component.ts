import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-element-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ImageElementComponent),
       multi: true
  }]
})
export class ImageElementComponent implements OnInit, ControlValueAccessor {

  imageElement;
  
  padding;
  general;
  image;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.imageElement = value;

      if (!this.padding) {
        this.padding = this.imageElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }

      if (!this.general) {
        this.general = this.imageElement.properties.find((property) => {
          return property.name == 'general';
        });
      }

      if (!this.image) {
        this.image = this.imageElement.properties.find((property) => {
          return property.name == 'image';
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
    // this.textElement.value =  this.editor.value();
    // this.onChange(this.textElement);
  }

  ngOnInit() {}

}
