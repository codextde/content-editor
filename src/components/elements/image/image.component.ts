import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';

@Component({
  selector: 'app-element-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ImageElementComponent),
       multi: true
  }]
})
export class ImageElementComponent implements ControlValueAccessor {

  imageElement;
  image;

  styles;


  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
      this.eventsService.subscribe('property-change', () => {
        this.styles = this.elementService.loadStyleProperties(this.imageElement);
      });
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.imageElement = value;
      this.styles = this.elementService.loadStyleProperties(this.imageElement);

      if (!this.image) {
        this.image = this.imageElement.properties.find((property) => {
          return property.name == 'image';
        });
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {}
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */



}
