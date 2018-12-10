import { faImage } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class ImageElementConfig {
  static config: IElement = {
    component: 'image',
    icon: faImage,
    title: 'Image',
    properties: [{
      name: 'image',
      src: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }, {
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };
}
