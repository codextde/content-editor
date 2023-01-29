import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'models/element.model';
import { ElementCreator } from '../element.creator';

export class VideoElementConfig {
    static config: IElement = {
        component: 'video',
        icon: faVideo,
        title: 'Video',
        properties: [
            {
                name: 'video',
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
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
        return ElementCreator.create(VideoElementConfig.config);
    }
}
