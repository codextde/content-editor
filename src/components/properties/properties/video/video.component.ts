import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventsService } from 'services/event.service';
import { IVideoProperty } from '../../models/video.model';

@Component({
    selector: 'app-property-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VideoPropertyComponent),
            multi: true,
        },
    ],
})
export class VideoPropertyComponent implements ControlValueAccessor {
    video: IVideoProperty = {
        src: '',
    };

    videoOptions = [
        {
            title: 'Autoplay',
            option: 'autoplay',
        },
        {
            title: 'Controls',
            option: 'controls',
        },
        {
            title: 'Loop',
            option: 'loop',
        },
        {
            title: 'Muted',
            option: 'muted',
        },
    ];

    constructor(private eventsService: EventsService) {}

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.video = value;
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
