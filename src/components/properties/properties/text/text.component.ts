import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
} from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'services/event.service';
import { FontService } from 'services/font.service';
import { ITextProperty } from '../../models/text.model';

@Component({
    selector: 'app-property-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextPropertyComponent),
            multi: true,
        },
    ],
})
export class TextPropertyComponent implements ControlValueAccessor {
    faAlignLeft = faAlignLeft;
    faAlignCenter = faAlignCenter;
    faAlignRight = faAlignRight;
    faBold = faBold;

    text: ITextProperty = {};

    fontFamily;

    lineHeights = ['1.5', '2', '2.5', '3'];

    constructor(
        private eventsService: EventsService,
        public fontService: FontService
    ) {}

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.text = value;
            if (this.text.fontFamily) {
                this.fontFamily = this.fontService.fonts.find(font => {
                    return font.fontFamily == this.text.fontFamily;
                });
            }
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {}
    /** NgModel End */
    onChange: any = () => {};

    change() {
        this.onChange(this.text);
        this.eventsService.publish('property-change');
    }

    textAlign(align) {
        this.text.textAlign = align;
        this.change();
    }

    selectFont(font) {
        this.text.fontFamily = font.fontFamily;
        this.fontFamily = font;
        this.change();
    }

    textWeight(weight) {
        this.text.fontWeight = weight;
        this.change();
    }

    selectLineHeight(lineHeight) {
        this.text['lineHeight'] = lineHeight;
        this.change();
    }
}
