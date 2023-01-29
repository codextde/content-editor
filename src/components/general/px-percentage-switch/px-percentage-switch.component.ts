import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PxPercentage } from 'components/properties/enums/px-percentage.enum';

@Component({
    selector: 'app-px-percentage-switch',
    templateUrl: './px-percentage-switch.component.html',
    styleUrls: ['./px-percentage-switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PxPercentageSwitchComponent),
            multi: true,
        },
    ],
})
export class PxPercentageSwitchComponent implements ControlValueAccessor {
    enum = PxPercentage;
    switch: string = 'px';

    /** NgModel Start */
    writeValue(value: string): void {
        this.switch = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {}

    /** NgModel End */
    onChange: any = () => {};

    change() {
        this.onChange(this.switch);
    }
}
