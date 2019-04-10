import { faImage } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';
import { ElementCreator } from '../element.creator';
import { HelperService } from 'src/services/helper.service';

export class ImageElementConfig {
  static config: IElement = {
    component: 'image',
    icon: faImage,
    title: 'Image',
    properties: [{
      name: 'image',
      src: HelperService.locationUrl + 'assets/img/image-placeholder.png'
    }, {
      name: 'general'
    }, {
      name: 'padding'
    }],
    value: ''
  };

  public static newElement(): IElement {
    return ElementCreator.create(ImageElementConfig.config);
  }
}
