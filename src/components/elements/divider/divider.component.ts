import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';

@Component({
  selector: 'app-element-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => DividerElementComponent),
       multi: true
  }]
})
export class DividerElementComponent implements ControlValueAccessor {

  dividerElement;

  divider;
  styles;


  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
      this.eventsService.subscribe('property-change', () => {
        this.styles = this.elementService.loadStyleProperties(this.dividerElement);
      });
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.dividerElement = value;
      this.styles = this.elementService.loadStyleProperties(this.dividerElement);

      if (!this.divider) {
        this.divider = this.dividerElement.properties.find((property) => {
          return property.name == 'divider';
        });
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
