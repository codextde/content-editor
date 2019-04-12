import { faImage } from '@fortawesome/free-solid-svg-icons';
import { IElement } from 'src/models/element.model';
import { LoaderService } from 'src/services/loader.service';
import { ElementCreator } from '../element.creator';

export class ImageElementConfig {
  static config: IElement = {
    component: 'image',
    icon: faImage,
    title: 'Image',
    properties: [{
      name: 'image',
      src: LoaderService.locationUrl + 'assets/img/image-placeholder.png'
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
