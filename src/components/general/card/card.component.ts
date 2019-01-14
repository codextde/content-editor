import { Component, Input } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    faAngleDown = faAngleDown;
    faAngleUp = faAngleUp;

    @Input() isCollapsed = true;
    @Input() cardTitle: string;

    constructor(
    ) {
    }

}
