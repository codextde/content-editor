import { faCode } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';
import { ElementCreator } from '../element.creator';

export class HtmlElementConfig {
  static config: IElement = {
    component: 'html',
    icon: faCode,
    title: 'HTML',
    properties: [
      {
        name: 'html',
        value: '<div>Example DIV</div>'
      }, {
        name: 'padding'
      }
    ],
    value: ''
  };

  public static newElement(): IElement {
    return ElementCreator.create(HtmlElementConfig.config);
  }
}
