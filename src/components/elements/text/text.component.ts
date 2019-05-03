import { Component, ElementRef, forwardRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IElement } from 'src/models/element.model';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'src/services/helper.service';
import { AngularDraggableDirective } from 'angular2-draggable';

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
  customText: boolean = false;
  preventUserSelect: boolean = false;
  faArrowsAlt = faArrowsAlt;
  movingOffset;

  @ViewChild('dragElement') dragElement: ElementRef;
  @ViewChild('editor') editorEl: ElementRef;
  @ViewChild('draggable') draggable: AngularDraggableDirective;
  @ViewChild('initialLetterEl') initialLetterEl: ElementRef;

  editor;
  textElement: IElement;
  foregroundColorpicker;
  backgroundColorpicker;

  styles;

  background;
  initialLetter;
  position;

  topKey;
  leftKey;

  initialLetterPadding: number;


  @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.editorEl.nativeElement.contains(event.target)) {
            if (this.textElement.value == '') {
              this.editor.value('Please enter your text here');
              this.customText = false;
            }
        }
    }

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService,
    private renderer: Renderer2,
    private helper: HelperService
    ) {
    this.eventsService.subscribe('property-change', () => {
      if (this.textElement) {
        this.styles = this.elementService.loadStyleProperties(this.textElement.properties);

        if (this.initialLetter) {
          // Wait until ngIf is rendered
          setTimeout(() => {
            this.initialLetterPadding = this.initialLetterEl.nativeElement.offsetWidth + 6; // (6) Margin of Initial Letter + 1
          }, 1);
        } else {
          this.initialLetterPadding = 0;
        }

        if (this.draggable && this.draggable.ngDraggable) {
          this.draggable.resetPosition();
        }

        if (this.position && this.position.position == 'absolute') {
          this.getPositionKeys();
          const rect = this.dragElement.nativeElement;
          const position =  { top: this.position[this.topKey] || rect.offsetTop, left: this.position[this.leftKey] ||  rect.offsetLeft };
          this.setPositionDragElement(position.top, position.left, true);
        }


        if (this.position && this.position.position == 'unset') {
          if (this.draggable  && this.draggable.ngDraggable) {
            this.draggable.resetPosition();
          }
          setTimeout(() => {
            const dragElement = this.dragElement.nativeElement;
            this.movingOffset = {x: dragElement.offsetLeft, y: dragElement.offsetTop};
          }, 1);
        }
      }
    });
  }


   getPositionKeys() {
    for (const key of Object.keys(this.position)) {
      if (key.startsWith('top')) {
        this.topKey = key;
      }
      if (key.startsWith('left')) {
        this.leftKey = key;
      }
    }
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
        this.getPositionKeys();
        this.movingOffset = { x: (this.position[this.leftKey] || 0), y: (this.position[this.topKey] || 0) };
      }


      if (this.editor) {
        if (this.textElement.value == '') {
          this.editor.value('Please enter your text here');
        } else {
          this.customText = true;
          this.editor.value(this.textElement.value);
        }

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
        'viewHtml',
        'cleanFormatting',
        'foreColor',
        'backColor'
      ],
      pasteCleanup: {
        all: true
      },
      select: (a) => {
        const selection = this.editor.getSelection();
        let foregroundColor = selection.focusNode.parentElement.style.color;
        if (foregroundColor == '') {
          foregroundColor = 'rgb(0,0,0)';
        }
        const hexForegroundColor = this.helper.rgbStringToHex(foregroundColor);
        this.foregroundColorpicker.value(hexForegroundColor);

        let backgroundColor = selection.focusNode.parentElement.style.backgroundColor;
        if (backgroundColor == '') {
          backgroundColor = 'rgb(255,255,255)';
        }
        const hexBackgroundColor = this.helper.rgbStringToHex(backgroundColor);
        this.backgroundColorpicker.value(hexBackgroundColor);

      },
      keyup: (a) => this.change(this),
      change: (a) => this.change(this)
    });
    this.editor = kendo.jQuery(this.editorEl.nativeElement).data('kendoEditor');
    this.editor.toolbar.window.wrapper[0].classList.add('ece');

    this.foregroundColorpicker = kendo.jQuery('.k-i-foreground-color').data('kendoColorPicker');
    this.backgroundColorpicker = kendo.jQuery('.k-i-paint').data('kendoColorPicker');

    this.renderer.listen(this.editorEl.nativeElement, 'click', () => {
      if (!this.customText) {
        this.editor.value('');
        this.customText = true;
      }
    });
  }




  onStart() {
    HelperService.clearSelection();
    this.preventUserSelect = true;
    this.movingOffset = { x: (this.position[this.leftKey] || 0), y: (this.position[this.topKey] || 0) };
  }
  onStop() {
    this.preventUserSelect = false;
  }


  onMoving(ev) {
    this.setPositionDragElement(+ev.y, +ev.x);
  }

  setPositionDragElement(top: number, left: number, setMovingOffset: boolean = false) {
    if (setMovingOffset) {
      this.movingOffset = { x: left, y: top };
    }
    if (this.position && this.position.position != 'unset') {
      this.position[this.topKey] =  top;
      this.position[this.leftKey] = left;
    }
    this.styles = this.elementService.loadStyleProperties(this.textElement.properties);
    this.onChange(this.textElement);
  }

}
