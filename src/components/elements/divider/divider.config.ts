import { faEquals } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'models/element.model';
import { ElementCreator } from '../element.creator';

export class DividerElementConfig {
    static config: IElement = {
        component: 'divider',
        icon: faEquals,
        title: 'divider',
        properties: [
            {
                name: 'divider',
                color: '#000',
                size: 5,
            },
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
        return ElementCreator.create(DividerElementConfig.config);
    }
}
