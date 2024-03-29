import {
    Component,
    ElementRef,
    forwardRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IHeadlineProperty } from 'components/properties/models/headline.model';
import { IElement } from 'models/element.model';
import { ElementService } from 'services/element.service';
import { EventsService } from 'services/event.service';
declare var kendo: any;
declare var document: any;
/// <reference path="kendo.all.d.ts" />

@Component({
    selector: 'app-element-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HeadlineElementComponent),
            multi: true,
        },
    ],
})
export class HeadlineElementComponent implements OnInit, ControlValueAccessor {
    customText: boolean = false;
    @ViewChild('editor', { static: true }) editorEl: ElementRef;
    editor;

    headlineElement: IElement;
    // headlineProperty: IHeadlineProperty;

    styles;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService,
        private renderer: Renderer2
    ) {
        this.eventsService.subscribe('property-change', () => {
            // this.headlineElement.value = this.headlineProperty.text;
            this.styles = this.elementService.loadStyleProperties(
                this.headlineElement.properties
            );
        });
    }

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.headlineElement = value;
            this.styles = this.elementService.loadStyleProperties(
                value.properties
            );

            /*if (!this.headlineProperty) {
        this.headlineProperty = this.headlineElement.properties.find((property) => {
          return property.name == 'headline';
        });
      }*/

            if (this.editor) {
                if (this.headlineElement.value == '') {
                    this.editor.value('Headline');
                } else {
                    this.customText = true;
                    this.editor.value(this.headlineElement.value);
                }
            }

            // this.headlineElement.value = this.headlineProperty.text;
        }
    }
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {}
    /** NgModel End */
    onChange: any = () => {};

    change(ev) {
        this.headlineElement.value = this.editor.value();
        this.onChange(this.headlineElement);
    }

    ngOnInit() {
        // Removed Kendo from the Heading Element
        <kendo.ui.Editor>kendo.jQuery(this.editorEl.nativeElement).kendoEditor({
            tools: [],
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

        // Improve Logic to Remove Toolbar
        this.renderer.listen(this.editorEl.nativeElement, 'mousedown', () => {
            setTimeout(() => {
                let editorToolbar = document.querySelectorAll('.k-widget');
                editorToolbar.forEach(element => {
                    element.style.display = 'none';
                });
            }, 1);
        });
    }
}
