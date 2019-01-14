import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';

@Component({
  selector: 'app-element-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => VideoElementComponent),
       multi: true
  }]
})
export class VideoElementComponent implements ControlValueAccessor {

  videoElement;

  videoProperty;
  styles;

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
    this.eventsService.subscribe('property-change', () => {
      this.styles = this.elementService.loadStyleProperties(this.videoElement);
      this.videoElement.value = this.videoProperty.src;
    });
  }

  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.videoElement = value;
      this.styles = this.elementService.loadStyleProperties(this.videoElement);

      if (!this.videoProperty) {
        this.videoProperty = this.videoElement.properties.find((property) => {
          return property.name == 'video';
        });
      }

      this.videoElement.value = this.videoProperty.value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {}
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */


}
