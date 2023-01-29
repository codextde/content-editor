import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IHeadlineProperty } from '../../models/headline.model';
import { EventsService } from 'services/event.service';

@Component({
    selector: 'app-property-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HeadlinePropertyComponent),
            multi: true,
        },
    ],
})
export class HeadlinePropertyComponent implements ControlValueAccessor {
    constructor(private eventsService: EventsService) {}

    headline: IHeadlineProperty = {
        text: 'Sample Heading',
        tag: 'h1',
    };

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.headline = value;
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {}
    /** NgModel End */
    onChange: any = () => {};
    onTouched = () => {};

    change() {
        this.eventsService.publish('property-change');
    }
}
