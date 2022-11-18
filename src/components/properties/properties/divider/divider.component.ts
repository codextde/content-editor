import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDividerProperty } from '../../models/divider.model';

@Component({
    selector: 'app-property-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DividerPropertyComponent),
            multi: true,
        },
    ],
})
export class DividerPropertyComponent implements ControlValueAccessor {
    divider: IDividerProperty = {
        color: '',
        style: '',
        align: '',
        width: '',
    };

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.divider = value;
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
        this.onChange(this.divider);
    }

    textAlign(align) {
        this.divider.align = align;
        this.change();
    }
}
