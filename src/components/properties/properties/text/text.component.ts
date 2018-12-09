import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ITextProperty } from '../../models/text.model';
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => TextPropertyComponent),
       multi: true
  }]
})
export class TextPropertyComponent implements ControlValueAccessor {
  faAlignLeft = faAlignLeft;
  faAlignCenter = faAlignCenter;
  faAlignRight = faAlignRight;

  text: ITextProperty = {
    color: '',
    align: '',
    lineHeight: '',
    fontFamily: '',
    size: ''
  };

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.text = value;
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
    this.onChange(this.text);
  }

  textAlign(align) {
    this.text.align = align;
    this.change();
  }

}
