import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ElementService {
  constructor() {
  }

  loadStyleProperties(element) {
    const padding = element.properties.find((property) => {
      return property.name == 'padding';
    });
    const general = element.properties.find((property) => {
      return property.name == 'general';
    });
    const text = element.properties.find((property) => {
      return property.name == 'text';
    });
    const background = element.properties.find((property) => {
      return property.name == 'background';
    });
    return {...general, ...padding, ...text, ...background};
  }

}
