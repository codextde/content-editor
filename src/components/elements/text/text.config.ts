import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class TextElementConfig {
  static config: IElement = {
    component: 'text',
    icon: faAlignCenter,
    title: 'Text',
    properties: [{
      name: 'general'
    }, {
      name: 'text'
    }, {
      name: 'padding'
    }],
    value: 'Hallo'
  };
}
