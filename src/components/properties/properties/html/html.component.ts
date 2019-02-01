import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MonacoService } from 'src/services/monaco.service';
import { EventsService } from 'src/services/event.service';

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
  htmlValue;
  htmlOptions = {theme: 'vs-dark', language: 'html', value: '<div></div>' };
  editor;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.htmlValue = value;
      this.htmlOptions.value = value.value;
    }
    if (value == '') {
      this.editor.setValue('');
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
    private monacoService: MonacoService,
    private eventsService: EventsService
  ) {}


  ngOnInit() {
    this.monacoService.loadMonaco().then((monaco: any) => {
      this.editor = monaco.editor.create(this.editorElm.nativeElement, this.htmlOptions);
      this.editor.onDidChangeModelContent((e) => {
        this.htmlValue.value = this.editor.getValue();
        this.onChange(this.htmlValue);
        this.eventsService.publish('property-change');
      });
    });
  }

  onChange: any = () => {};
  onTouched = () => {};


}
