import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPaddingProperty } from './models/padding.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  animations: [
    trigger(
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
    )
  ]
})
export class PropertiesComponent implements OnInit {

  faArrowDown = faArrowDown;
  @Output() onClose = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit();
  }

}
