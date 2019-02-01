import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MonacoService } from 'src/services/monaco.service';
import { EventsService } from 'src/services/event.service';


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
  cssValue;
  cssOptions = {theme: 'vs-dark', language: 'css', value: ''};
  editor;

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.cssValue = value;
      this.cssOptions.value = value.value;
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
    private monacoService: MonacoService,
    private eventsService: EventsService
  ) {}


  ngOnInit() {
    this.monacoService.loadMonaco().then((monaco: any) => {
      this.editor = monaco.editor.create(this.editorElm.nativeElement, this.cssOptions);
      this.editor.onDidChangeModelContent((e) => {
        this.cssOptions.value = this.editor.getValue();
        this.onChange(this.cssValue);
        this.eventsService.publish('property-change');
      });
    });
  }


  onChange: any = () => {};
  onTouched = () => {};


}
