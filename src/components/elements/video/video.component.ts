import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IVideoProperty } from 'src/components/properties/models/video.model';
import { IElement } from 'src/models/element.model';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';

@Component({
    selector: 'app-element-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VideoElementComponent),
            multi: true,
        },
    ],
})
export class VideoElementComponent implements ControlValueAccessor {
    videoElement: IElement;
    videoProperty: IVideoProperty;

    styles;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService
    ) {
        this.eventsService.subscribe('property-change', () => {
            this.styles = this.elementService.loadStyleProperties(
                this.videoElement.properties
            );
            this.videoElement.value = this.videoProperty.src;
        });
    }

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.videoElement = value;
            this.styles = this.elementService.loadStyleProperties(
                this.videoElement.properties
            );

            if (!this.videoProperty) {
                this.videoProperty = this.videoElement.properties.find(
                    property => {
                        return property.name == 'video';
                    }
                );
            }

            this.videoElement.value = this.videoProperty.src;
        }
    }

    registerOnChange(fn: (value: any) => void): void {}
    registerOnTouched(fn: () => void): void {}
    /** NgModel End */
}
