import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-element-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => VideoElementComponent),
       multi: true
  }]
})
export class VideoElementComponent implements OnInit, ControlValueAccessor {

  videoElement;
  
  padding;
  general;
  video;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.videoElement = value;

      if (!this.padding) {
        this.padding = this.videoElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }

      if (!this.general) {
        this.general = this.videoElement.properties.find((property) => {
          return property.name == 'general';
        });
      }

      if (!this.video) {
        this.video = this.videoElement.properties.find((property) => {
          return property.name == 'video';
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
