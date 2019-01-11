import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MonacoService } from 'src/services/monaco.service';

@Component({
  selector: 'app-property-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => HtmlPropertyComponent),
       multi: true
  }]
})
export class HtmlPropertyComponent implements OnInit, ControlValueAccessor {

  @ViewChild('editorElm') editorElm: ElementRef;
  htmlOptions = {theme: 'vs-dark', language: 'html', value: '<div></div>' };



  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.htmlOptions.value = value.value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** NgModel End */

  constructor(
    private monacoService: MonacoService
  ) {}


  ngOnInit() {
    this.monacoService.loadMonaco().then((monaco: any) => {
      const editor = monaco.editor.create(this.editorElm.nativeElement, this.htmlOptions);
      editor.onDidChangeModelContent((e) => {
        this.onChange(editor.getValue());
      });
    });
  }

  onChange: any = () => {};
  onTouched = () => {};

}
