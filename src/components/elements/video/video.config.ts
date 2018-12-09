import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class VideoElementConfig {
  static config: IElement = {
    component: 'video',
    icon: faVideo,
    title: 'Video',
    properties: [{
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };
}
