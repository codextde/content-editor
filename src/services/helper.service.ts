import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  styleElement: any;
  basePath: string;

  constructor() {
    this.basePath = this.getBasePath();
  }

  async applyStyle(css) {

    if (this.styleElement) {
      await this.styleElement.remove();
    }

    this.styleElement = document.createElement('style');
    this.styleElement.type = 'text/css';
    this.styleElement.appendChild(document.createTextNode(css));
      document.head.appendChild(this.styleElement);

  }

  getBasePath() {
    const virtualDir = this.getCookie('X-IEA-ApplicationPath');
    const study = this.getCookie('X-IEA-Study');

    let url = '';

    if (virtualDir && virtualDir.length > 0) {
        url += '/' + virtualDir;
    }

    if (study && study.length > 0) {
        url += '/' + study;
    }

    return `${url}/`;
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  getCookie = (name) => {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return '';
  }
}
