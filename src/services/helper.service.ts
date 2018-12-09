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
}
