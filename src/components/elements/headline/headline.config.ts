import { faFont } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class HeadlineElementConfig {
  static config: IElement = {
    component: 'headline',
    icon: faFont,
    title: 'Headline',
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
    value: '<h1>Hallo</h1>'
  };
}
