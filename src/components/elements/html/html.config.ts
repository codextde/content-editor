import { faCode } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class HtmlElementConfig {
  static config: IElement = {
    component: 'html',
    icon: faCode,
    title: 'HTML',
    properties: [{
        name: 'padding',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      },
      {
        name: 'html',
        value: '<div>Example DIV</div>'
      }
    ],
    value: ''
  };
}
