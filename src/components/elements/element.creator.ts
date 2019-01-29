import { IElement } from 'src/models/element.model';

export class ElementCreator {
  static create(event: IElement) {
    return {
      component: event.component,
      icon: event.icon,
      title: event.title,
      properties: event.properties,
      value: event.value

    };
  }
}
