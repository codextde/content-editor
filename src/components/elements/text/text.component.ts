import {
    Component,
    ElementRef,
    forwardRef,
    OnInit,
    ViewChild,
    Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import '@progress/kendo-ui';
import { IElement } from 'models/element.model';
import { ElementService } from 'services/element.service';
import { EventsService } from 'services/event.service';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'services/helper.service';
import { AngularDraggableDirective } from 'angular2-draggable';

declare var kendo: any;

@Component({
    selector: 'app-element-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextElementComponent),
            multi: true,
        },
    ],
})
export class TextElementComponent implements OnInit, ControlValueAccessor {
    customText: boolean = false;
    preventUserSelect: boolean = false;
    faArrowsAlt = faArrowsAlt;
    movingOffset;

    @ViewChild('dragElement', { static: true }) dragElement: ElementRef;
    @ViewChild('editor', { static: true }) editorEl: ElementRef;
    @ViewChild('draggable', { static: true })
    draggable: AngularDraggableDirective;

    editor;
    textElement: IElement;

    styles;

    background;
    initialLetter;
    position;

    topKey;
    leftKey;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService,
        private renderer: Renderer2
    ) {
        this.eventsService.subscribe('property-change', () => {
            this.styles = this.elementService.loadStyleProperties(
                this.textElement.properties
            );

            if (this.draggable) {
                this.draggable.resetPosition();
            }
            if (this.position && this.position.position == 'absolute') {
                this.getPositionKeys();
            }
            if (this.position && this.position.position == 'unset') {
                if (this.draggable) {
                    this.draggable.resetPosition();
                    setTimeout(() => {
                        const dragElement = this.dragElement.nativeElement;
                        this.movingOffset = {
                            x: dragElement.offsetLeft,
                            y: dragElement.offsetTop,
                        };
                    }, 10);
                }
            }
        });
    }
    getPositionKeys() {
        for (const key of Object.keys(this.position)) {
            console.log(key);
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
            this.styles = this.elementService.loadStyleProperties(
                value.properties
            );

            if (!this.initialLetter) {
                this.initialLetter = this.textElement.properties.find(
                    property => {
                        return property.name == 'initialLetter';
                    }
                );
            }
            if (!this.position) {
                this.position = this.textElement.properties.find(property => {
                    return property.name == 'position';
                });
                this.getPositionKeys();
                this.movingOffset = {
                    x: this.position[this.leftKey] || 0,
                    y: this.position[this.topKey] || 0,
                };
            }

            if (this.editor) {
                if (this.textElement.value == '') {
                    this.editor.value('Please enter your Text here');
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
        this.textElement.value = this.editor.value();
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
                'backColor',
            ],
            pasteCleanup: {
                all: true,
            },
            keyup: a => this.change(this),
            change: a => this.change(this),
        });
        this.editor = kendo
            .jQuery(this.editorEl.nativeElement)
            .data('kendoEditor');

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
        this.movingOffset = {
            x: this.position[this.leftKey] || 0,
            y: this.position[this.topKey] || 0,
        };
    }
    onStop() {
        this.preventUserSelect = false;
    }

    onMoving(ev) {
        if (this.position && this.position.position != 'unset') {
            this.position[this.topKey] = +ev.y;
            this.position[this.leftKey] = +ev.x;
        }
        this.styles = this.elementService.loadStyleProperties(
            this.textElement.properties
        );
        this.onChange(this.textElement);
    }
}
