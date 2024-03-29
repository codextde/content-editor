import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventsService } from 'services/event.service';
import { IImageProperty } from '../../models/image.model';

@Component({
    selector: 'app-property-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImagePropertyComponent),
            multi: true,
        },
    ],
})
export class ImagePropertyComponent implements ControlValueAccessor {
    img: IImageProperty = {
        src: '',
    };

    constructor(private eventsService: EventsService) {}

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.img = value;
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {}
    /** NgModel End */

    onChange: any = () => {};

    change() {
        this.eventsService.publish('property-change');
    }
}
