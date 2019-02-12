import { Component, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IPositionProperty } from '../../models/position.model';
import { EventsService } from 'src/services/event.service';

@Component({
  selector: 'app-property-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => PositionPropertyComponent),
       multi: true
  }]
})
export class PositionPropertyComponent implements ControlValueAccessor {
  positionTop = 'top.px';
  positionTopUnit: string = 'px';

  positionLeft = 'left.px';
  positionLeftUnit: string = 'px';


  constructor(
    public cdr: ChangeDetectorRef,
    private eventsService: EventsService
  ) {

  }

  faInfoCircle = faInfoCircle;

  position: IPositionProperty = {};
  switch;


  /** NgModel Start */
  writeValue(value: any): void {
    if (value) {
      this.position = value;
      if (!this.position[this.positionTop]) {
        this.position[this.positionTop] = 0
      } 
      if (!this.position[this.positionLeft]) {
        this.position[this.positionLeft] = 0
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
    this.onChange(this.position);
    this.eventsService.publish('property-change');
  }

  changePosition(value) {
    if (value == 'unset') {
      this.position[this.positionTop] = null;
      this.position[this.positionLeft] = null;
    }
    this.position.position = value;
    this.change();
  }

  changePositionUnit(position) {
    let unit = position == 'top' ? this.positionTopUnit : this.positionLeftUnit;
    if (unit == 'px') {
      if (this.position[`${position}.%`]) {
        this.position[`${position}.px`] = this.position[`${position}.%`];
      }
      delete this.position[`${position}.%`];
      if(position == 'top') {
        this.positionTop = `${position}.px`;
      }
      if(position == 'left') {
        this.positionLeft = `${position}.px`;
      }
    }

    if (unit == '%') {
      if (this.position[`${position}.px`]) {
        this.position[`${position}.%`] = this.position[`${position}.px`];
      }
      delete this.position[`${position}.px`];
      if(position == 'top') {
        this.positionTop = `${position}.%`;
      }
      if(position == 'left') {
        this.positionLeft = `${position}.%`;
      }
    }

    this.change();
  }

}
