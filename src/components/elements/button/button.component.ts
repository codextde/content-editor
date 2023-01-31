import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementService } from 'services/element.service';
import { EventsService } from 'services/event.service';
import { IDividerProperty } from 'components/properties/models/divider.model';
import { IElement } from 'models/element.model';

@Component({
    selector: 'app-element-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ButtonElementComponent),
            multi: true,
        },
    ],
})
export class ButtonElementComponent implements ControlValueAccessor {
    buttonElement: IElement;
    dividerProperty: IDividerProperty;

    styles;

    constructor(
        private elementService: ElementService,
        private eventsService: EventsService
    ) {
        this.eventsService.subscribe('property-change', () => {
            this.styles = this.elementService.loadStyleProperties(
                this.buttonElement.properties
            );
        });
    }

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.buttonElement = value;
            this.styles = this.elementService.loadStyleProperties(
                this.buttonElement.properties
            );

            if (!this.dividerProperty) {
                this.dividerProperty = this.buttonElement.properties.find(
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
