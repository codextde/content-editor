import {
    faCheckSquare,
    faMobileButton,
} from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'models/element.model';
import { ElementCreator } from '../element.creator';

export class ButtonElementConfig {
    static config: IElement = {
        component: 'button',
        icon: faCheckSquare,
        title: 'button',
        properties: [
            {
                name: 'general',
            },
            {
                name: 'padding',
            },
        ],
        value: '',
    };

    public static newElement(): IElement {
        return ElementCreator.create(ButtonElementConfig.config);
    }
}
