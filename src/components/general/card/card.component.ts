import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    faAngleDown = faAngleDown;
    faAngleUp = faAngleUp;

    @Input() isCollapsed = true;
    @Input() title: string;

    constructor(
    ) {
    }

}
