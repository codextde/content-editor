import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => StepperComponent),
       multi: true
  }]
})
export class StepperComponent implements  ControlValueAccessor {

  faMinus = faMinus;
  faPlus = faPlus;

  value;

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }
  /** NgModel End */


  onChange: any = () => {};


  onTouched = () => {};

  change() {
    this.onChange(this.value);
  }

  modelChange(data) {
    if (!data) {
      this.value = null;
    }
    this.change();
  }

  step(method: string) {
    if (!this.value) {
      this.value = 0;
    }
    if (method == 'up') {
      this.value++;
    }
    if (method == 'down') {
      this.value--;
    }

    this.change();
  }
}
