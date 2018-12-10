import { faEquals } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class DividerElementConfig {
  static config: IElement = {
    component: 'divider',
    icon: faEquals,
    title: 'divider',
    properties: [{
      name: 'divider',
      color: '#000',
      size: '5px'
    }, {
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };
}
