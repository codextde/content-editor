import { Injectable } from '@angular/core';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  static _locationUrl: string;


  styleElement: any;
  basePath: string;
  studyName: string;


  public static get locationUrl(): string {
    return this._locationUrl;
  }

  public static set locationUrl(locationUrl: string) {
    locationUrl ? this._locationUrl = locationUrl : this._locationUrl = './';
  }

  public static clearObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  public static clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

  constructor() {
    this.basePath = this.getBasePath();
    this.studyName = this.getCookie('X-IEA-Study');
  }

  loadPropertyValue() {
    return {};
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

  validURL(str) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex .test(str)) {
      return false;
    } else {
      return true;
    }
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
