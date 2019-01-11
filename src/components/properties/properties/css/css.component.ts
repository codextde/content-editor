import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MonacoService } from 'src/services/monaco.service';


@Component({
  selector: 'app-property-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => CssPropertyComponent),
       multi: true
  }]
})
export class CssPropertyComponent implements OnInit, ControlValueAccessor {

  @ViewChild('editorElm') editorElm: ElementRef;

  cssOptions = {theme: 'vs-dark', language: 'css', value: '.test {\n display: block\n}'};

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.cssOptions.value = value;
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

  constructor(
    private monacoService: MonacoService
  ) {}


  ngOnInit() {
    this.monacoService.loadMonaco().then((monaco: any) => {
      const editor = monaco.editor.create(this.editorElm.nativeElement, this.cssOptions);
      editor.onDidChangeModelContent((e) => {
        this.onChange(editor.getValue());
      });
    });
  }


  onChange: any = () => {};
  onTouched = () => {};


}
