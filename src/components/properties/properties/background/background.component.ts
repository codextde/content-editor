import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventsService } from 'src/services/event.service';
import { HelperService } from 'src/services/helper.service';
import { IBackgroundProperty } from '../../models/background.model';

@Component({
  selector: 'app-property-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => BackgroundPropertyComponent),
       multi: true
  }]
})
export class BackgroundPropertyComponent implements ControlValueAccessor {

  background: IBackgroundProperty = {};
  backgroundImageUrl: string;

  constructor(
    private eventsService: EventsService,
    private helperService: HelperService
  ) {
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.background = value;
      if (this.background['background-image']) {
        this.backgroundImageUrl = this.background['background-image'].replace('url(', '').slice(0, -1);
        this.changeBackground();
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */
  onChange: any = () => {};

  change() {
    this.onChange(this.background);
    this.eventsService.publish('property-change');
  }


  changeBackground() {
    if (this.helperService.validURL(this.backgroundImageUrl)) {
      this.background['background-image'] = `url(${this.backgroundImageUrl})`;
    } else {
      this.background['background-image'] = null;
    }
    this.change();
  }

}
