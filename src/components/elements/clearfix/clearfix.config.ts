import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';
import { ElementCreator } from '../element.creator';

export class ClearfixElementConfig {
  static config: IElement = {
    component: 'clearfix',
    icon: faArrowsAltH,
    title: 'Clearfix'
  };

  public static newElement(): IElement {
    return ElementCreator.create(ClearfixElementConfig.config);
  }
}
