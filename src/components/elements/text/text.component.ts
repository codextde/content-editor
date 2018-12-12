import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var kendo: any;

@Component({
  selector: 'app-element-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => TextElementComponent),
       multi: true
  }]
})
export class TextElementComponent implements OnInit, ControlValueAccessor {

  @ViewChild('editor') editorEl: ElementRef;
  editor;
  textElement;

  styles;
  
  padding;
  general;
  text;
  background;
  initialLetter;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.textElement = value;

      if (!this.padding) {
        this.padding = this.textElement.properties.find((property) => {
          return property.name == 'padding';
        });
      }

      if (!this.general) {
        this.general = this.textElement.properties.find((property) => {
          return property.name == 'general';
        });
      }

      if (!this.text) {
        this.text = this.textElement.properties.find((property) => {
          return property.name == 'text';
        });
      }

      if (!this.background) {
        this.background = this.textElement.properties.find((property) => {
          return property.name == 'background';
        });
      }

      if (!this.initialLetter) {
        this.initialLetter = this.textElement.properties.find((property) => {
          return property.name == 'initialLetter';
        });
      }


      if (this.editor) {
        this.editor.value(this.textElement.value);
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
    this.textElement.value =  this.editor.value();
    this.onChange(this.textElement);
  }

  ngOnInit() {
    kendo.jQuery(this.editorEl.nativeElement).kendoEditor({
      tools: [
        'bold',
        'italic',
        'underline',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'insertUnorderedList',
        'insertOrderedList',
        'indent',
        'outdent',
        'insertImage',
        'subscript',
        'superscript',
        'tableWizard',
        'createTable',
        'addRowAbove',
        'addRowBelow',
        'addColumnLeft',
        'addColumnRight',
        'deleteRow',
        'deleteColumn',
        'viewHtml',
        'cleanFormatting',
        'foreColor',
        'backColor'
      ],
      pasteCleanup: {
        all: true
      },
      keyup: (a) => this.change(this),
      change: (a) => this.change(this)
    });
    this.editor = kendo.jQuery(this.editorEl.nativeElement).data('kendoEditor');
  }


}
