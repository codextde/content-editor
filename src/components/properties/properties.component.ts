import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  animations: [
    /*trigger(
      'fadeInAnimation',
      [
        transition(
          ':enter', [
            style({ opacity: 0, transform: 'translateY(+150px) translateX(0)' }),
            animate('300ms ease-in-out', style({transform: 'translateX(0)', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translateX(0)', 'opacity': 1  }),
            animate('500ms  ease-in-out', style({ opacity: 0, transform: 'scale(0.6) translateY(+70px) translateX(0)'}))
          ]
        )]
    )*/
  ]
})
export class PropertiesComponent {
  // Icons
  faArrowDown = faArrowDown;

  _element: any;

  @Input()
  set element(element: any) {
    this._element = element;
    console.log('elementChange')

    // Open First Item in Property Panel
    setTimeout(() => {
      const card = this.property.nativeElement.children[0];
      if (card) {
        card.querySelector('.card-title').click();
      }
    });
  }


  @Output() onClose = new EventEmitter();
  @ViewChild('property') property: ElementRef;


  constructor() { }

  close() {
    this.onClose.emit();
  }

}
