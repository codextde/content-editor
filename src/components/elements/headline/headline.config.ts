import { faFont } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';
import { ElementCreator } from '../element.creator';

export class HeadlineElementConfig {
  static config: IElement = {
    component: 'headline',
    icon: faFont,
    title: 'Headline',
    properties: [{
      name: 'headline',
      text: 'Sample Headline',
      tag: 'h1'
    }, {
      name: 'general'
    }, {
      name: 'text'
    }, {
      name: 'background'
    }, {
      name: 'padding'
    }],
    value: ''
  };

  public static newElement(): IElement {
    return ElementCreator.create(HeadlineElementConfig.config);
  }
}
