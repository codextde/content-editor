import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var kendo: any;

@Component({
  selector: 'app-element-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => HeadlineElementComponent),
       multi: true
  }]
})
export class HeadlineElementComponent implements OnInit, ControlValueAccessor {

  @ViewChild('editor') editorEl: ElementRef;
  editor;
  headlineElement;

  padding;
  general;
  text;
  background;
  headline;

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.headlineElement = value;

      if (!this.padding) {
        this.padding = this.headlineElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }

      if (!this.general) {
        this.general = this.headlineElement.properties.find((property) => {
          return property.name == 'general';
        });
      }

      if (!this.text) {
        this.text = this.headlineElement.properties.find((property) => {
          return property.name == 'text';
        });
      }

      if (!this.background) {
        this.background = this.headlineElement.properties.find((property) => {
          return property.name == 'background';
        });
      }

      if (!this.headline) {
        this.headline = this.headlineElement.properties.find((property) => {
          return property.name == 'headline';
        });
      }

      if (this.editor) {
        this.editor.value(this.headlineElement.value);
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
    this.headlineElement.value =  this.editor.value();
    this.onChange(this.headlineElement);
  }

  ngOnInit() {
    // Removed Kendo from the Heading Element
    /*
    kendo.jQuery(this.editorEl.nativeElement).kendoEditor({
      tools: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'foreColor'
      ],
      pasteCleanup: {
          all: true
      },
      keyup: (a) => this.change(this),
      change: (a) => this.change(this)
    });
    this.editor = kendo.jQuery(this.editorEl.nativeElement).data('kendoEditor');*/
  }

}
