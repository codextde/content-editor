import { Component, OnInit, ViewChild, ElementRef, forwardRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ElementsService } from 'src/services/elements.service';
import { ElementService } from 'src/services/element.service';
import { EventsService } from 'src/services/event.service';
import { IElement } from 'src/models/element.model';
declare var kendo: any;

@Component({
  selector: 'app-element-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => HtmlElementComponent),
       multi: true
  }]
})
export class HtmlElementComponent implements ControlValueAccessor {

  htmlElement: IElement;
  htmlProperty;

  styles;

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
    ) {
    this.eventsService.subscribe('property-change', () => {
      this.styles = this.elementService.loadStyleProperties(this.htmlElement);
      this.htmlElement.value = this.htmlProperty.value;
    });
  }


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.htmlElement = value;
      this.styles = this.elementService.loadStyleProperties(this.htmlElement);

      if (!this.htmlProperty) {
        this.htmlProperty = this.htmlElement.properties.find((property) => {
          return property.name == 'html';
        });
      }

      this.htmlElement.value = this.htmlProperty.value;

    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  /** NgModel End */
  onChange: any = () => {};

  change(ev) {
    this.onChange(this.htmlElement);
  }
}
