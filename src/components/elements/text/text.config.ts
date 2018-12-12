import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class TextElementConfig {
  static config: IElement = {
    component: 'text',
    icon: faAlignCenter,
    title: 'Text',
    properties: [{
      name: 'initialLetter'
    }, {
      name: 'general'
    }, {
      name: 'text'
    }, {
      name: 'padding'
    }, {
      name: 'background'
    }],
    // tslint:disable-next-line:max-line-length
    value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  };
}
