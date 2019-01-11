import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MonacoService } from 'src/services/monaco.service';

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
export class JavascriptPropertyComponent  implements OnInit, ControlValueAccessor {
  @ViewChild('editorElm') editorElm: ElementRef;
  javascriptOptions = {theme: 'vs-dark', language: 'javascript', value: 'function x() {\n  console.log("Hello world!");\n}'};

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.javascriptOptions.value = value.value;
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
      const editor = monaco.editor.create(this.editorElm.nativeElement, this.javascriptOptions);
      editor.onDidChangeModelContent((e) => {
        this.onChange(editor.getValue());
      });
    });
  }

  onChange: any = () => {};
  onTouched = () => {};


}
