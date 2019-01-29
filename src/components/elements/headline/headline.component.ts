import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';
import { IElement } from 'src/models/element.model';
import { IHeadlineProperty } from 'src/components/properties/models/headline.model';
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

  headlineElement: IElement;
  headlineProperty: IHeadlineProperty;

  styles;

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
    this.eventsService.subscribe('property-change', () => {
      this.headlineElement.value = this.headlineProperty.text;
      this.styles = this.elementService.loadStyleProperties(this.headlineElement.properties);
    });
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.headlineElement = value;
      this.styles = this.elementService.loadStyleProperties(value.properties);


      if (!this.headlineProperty) {
        this.headlineProperty = this.headlineElement.properties.find((property) => {
          return property.name == 'headline';
        });
      }

      if (this.editor) {
        this.editor.value(this.headlineElement.value);
      }

      this.headlineElement.value = this.headlineProperty.text;
    }
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */
  onChange: any = () => {};

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
