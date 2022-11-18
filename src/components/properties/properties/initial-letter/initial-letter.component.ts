import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInitialLetterProperty } from '../../models/initial-letter.model';

@Component({
    selector: 'app-property-initial-letter',
    templateUrl: './initial-letter.component.html',
    styleUrls: ['./initial-letter.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InitialLetterPropertyComponent),
            multi: true,
        },
    ],
})
export class InitialLetterPropertyComponent implements ControlValueAccessor {
    initialLetter: IInitialLetterProperty = {};

    /** NgModel Start */
    writeValue(value: any): void {
        if (value) {
            this.initialLetter = value;
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
}
