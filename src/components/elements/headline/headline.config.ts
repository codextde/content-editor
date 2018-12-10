import { faFont } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';

export class HeadlineElementConfig {
  static config: IElement = {
    component: 'headline',
    icon: faFont,
    title: 'Headline',
    properties: [{
      name: 'general'
    }, {
      name: 'text'
    }, {
      name: 'padding'
    }],
    value: '<h1>Example Title</h1>'
  };
}
