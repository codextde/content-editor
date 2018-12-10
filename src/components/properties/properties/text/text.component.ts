import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { ITextProperty } from '../../models/text.model';

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
    fontFamily: {
      displayName: '',
      fontFamily: ''
    },
    size: ''
  };

  // Fonts
  fonts = [{
    displayName: 'Andale Mono',
    fontFamily: '"andale mono", times'
  }, {
    displayName: 'Arial Black',
    fontFamily: '"arial black", "avant garde", arial'
  }, {
    displayName: 'Comic Sans MS',
    fontFamily: '"comic sans ms", sans-serif'
  }, {
    displayName: 'Impact',
    fontFamily: 'impact, chicago'
  }, {
    displayName: 'Times New Roman',
    fontFamily: '"times new roman", times'
  }];

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

  selectFont(font) {
    this.text.fontFamily = font;
    this.change();
  }

}
