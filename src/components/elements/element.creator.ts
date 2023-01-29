import { IElement } from 'models/element.model';
import { HelperService } from 'services/helper.service';

export class ElementCreator {
    static create(event: IElement) {
        return HelperService.clearObject({
            component: event.component,
            icon: event.icon,
            title: event.title,
            properties: event.properties,
            value: event.value,
        });
    }
}
