import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class TextElementConfig {
  static config: IElement = {
    component: 'text',
    icon: faAlignCenter,
    title: 'Text',
    properties: [{
      name: 'text',
      color: '#000',
      align: 'left',
      height: '100%',
      familie: 'Arial',
      size: '12px'
    }, {
      name: 'padding',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }],
    value: 'Hallo'
  };
}
