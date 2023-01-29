import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IImageProperty } from 'components/properties/models/image.model';
import { IElement } from 'models/element.model';
import { ElementService } from 'services/element.service';
import { EventsService } from 'services/event.service';

@Component({
    selector: 'app-element-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageElementComponent),
            multi: true,
        },
    ],
})
export class ImageElementComponent implements ControlValueAccessor {
    imageElement: IElement;
    imageProperty: IImageProperty;

    styles;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService
    ) {
        this.eventsService.subscribe('property-change', () => {
            this.styles = this.elementService.loadStyleProperties(
                this.imageElement.properties
            );
            this.imageElement.value = this.imageProperty.src;
        });
    }

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.imageElement = value;
            this.styles = this.elementService.loadStyleProperties(
                this.imageElement.properties
            );

            if (!this.imageProperty) {
                this.imageProperty = this.imageElement.properties.find(
                    property => {
                        return property.name == 'image';
                    }
                );
            }
            this.imageElement.value = this.imageProperty.src;
        }
    }

    registerOnChange(fn: (value: any) => void): void {}
    registerOnTouched(fn: () => void): void {}
    /** NgModel End */
}
