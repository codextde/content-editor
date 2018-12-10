import { faImage } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class ImageElementConfig {
  static config: IElement = {
    component: 'image',
    icon: faImage,
    title: 'Image',
    properties: [{
      name: 'image',
      src: 'https://images.pexels.com/photos/1660603/pexels-photo-1660603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    }, {
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };
}
