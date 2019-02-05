import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import '@progress/kendo-ui';
import { IElement } from 'src/models/element.model';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'src/services/helper.service';

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
  preventUserSelect: boolean = false;
  faArrowsAlt = faArrowsAlt;
  movingOffset;

  @ViewChild('editor') editorEl: ElementRef;
  editor;
  textElement: IElement;

  styles;

  background;
  initialLetter;
  position;

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
    this.eventsService.subscribe('property-change', () => {
      this.styles = this.elementService.loadStyleProperties(this.textElement.properties);
    });
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.textElement = value;
      this.styles = this.elementService.loadStyleProperties(value.properties);

      if (!this.initialLetter) {
        this.initialLetter = this.textElement.properties.find((property) => {
          return property.name == 'initialLetter';
        });
      }

      if (!this.position) {
        this.position = this.textElement.properties.find((property) => {
          return property.name == 'position';
        });
        this.movingOffset = { x: (this.position.left || 0), y: (this.position.top || 0) };
      }


      if (this.editor) {
        this.editor.value(this.textElement.value);
      }
    }
  }


  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {}

  /** NgModel End */
  onChange: any = () => {};

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

  onStart() {
    HelperService.clearSelection();
    this.preventUserSelect = true;
    this.movingOffset = { x: (this.position.left || 0), y: (this.position.top || 0) };
  }
  onStop() {
    this.preventUserSelect = false;
  }

  onMoving(ev) {
    if (this.position && this.position.position != 'unset') {
      this.position.top = +ev.y;
      this.position.left = +ev.x;
    }
    this.onChange(this.textElement);
  }

}
