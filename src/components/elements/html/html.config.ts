import { faCode } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class HtmlElementConfig {
  static config: IElement = {
    component: 'html',
    icon: faCode,
    title: 'HTML',
    properties: [{
        name: 'padding'
      },
      {
        name: 'html',
        value: '<div>Example DIV</div>'
      }
    ],
    value: ''
  };
}
