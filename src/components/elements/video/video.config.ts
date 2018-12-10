import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class VideoElementConfig {
  static config: IElement = {
    component: 'video',
    icon: faVideo,
    title: 'Video',
    properties: [{
      name: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }, {
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };
}
