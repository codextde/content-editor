import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-property-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchPropertyComponent),
            multi: true,
        },
    ],
})
export class SwitchPropertyComponent implements ControlValueAccessor {
    @Input() title: string;
    @Input() switchTitle: string;
    switch: boolean;

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.switch = value;
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
        this.onChange(this.switch);
    }
}
