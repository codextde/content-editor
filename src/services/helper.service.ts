import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  styleElement: any;

  constructor() { }

  async applyStyle(css) {

    if (this.styleElement) {
      await this.styleElement.remove();
    }

    this.styleElement = document.createElement('style');
    this.styleElement.type = 'text/css';
    this.styleElement.appendChild(document.createTextNode(css));
      document.head.appendChild(this.styleElement);

  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
