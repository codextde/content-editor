import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';
import { IDividerProperty } from 'src/components/properties/models/divider.model';
import { IElement } from 'src/models/element.model';

@Component({
    selector: 'app-element-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DividerElementComponent),
            multi: true,
        },
    ],
})
export class DividerElementComponent implements ControlValueAccessor {
    dividerElement: IElement;
    dividerProperty: IDividerProperty;

    styles;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService
    ) {
        this.eventsService.subscribe('property-change', () => {
            this.styles = this.elementService.loadStyleProperties(
                this.dividerElement.properties
            );
        });
    }

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.dividerElement = value;
            this.styles = this.elementService.loadStyleProperties(
                this.dividerElement.properties
            );

            if (!this.dividerProperty) {
                this.dividerProperty = this.dividerElement.properties.find(
                    property => {
                        return property.name == 'divider';
                    }
                );
            }
        }
    }
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {}
    /** NgModel End */
    onChange: any = () => {};
}
