import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'models/element.model';
import { ElementCreator } from '../element.creator';

export class TextElementConfig {
    static config: IElement = {
        component: 'text',
        icon: faAlignCenter,
        title: 'Text',
        properties: [
            {
                name: 'initialLetter',
            },
            {
                name: 'general',
            },
            {
                name: 'text',
            },
            {
                name: 'padding',
            },
            {
                name: 'background',
            },
            {
                name: 'position',
            },
        ],
        // tslint:disable-next-line:max-line-length
        value: '',
    };

    public static newElement(): IElement {
        return ElementCreator.create(TextElementConfig.config);
    }
}
