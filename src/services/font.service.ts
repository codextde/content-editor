import { Injectable } from '@angular/core';
import * as WebFont from 'webfontloader';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  fonts = [{
    displayName: 'Open Sans',
    fontFamily: 'Open Sans',
    url: './assets/fonts/open-sans/open-sans.css'
  }, {
    displayName: 'Comic Sans MS',
    fontFamily: 'Comic Sans MS',
    url: './assets/fonts/comic-sans/comic-sans.css'
  }, {
    displayName: 'Sample',
    fontFamily: 'Sample',
    url: './assets/fonts/sample/sample.css'
  }];

  constructor() {
    let webFontsLoader = [];
    let urls = [];
    this.fonts.forEach((font) => {
      webFontsLoader.push(font.fontFamily);
      urls.push(font.url);
    })
    // Load Fonts
    WebFont.load({
      custom: {
        families: webFontsLoader,
        urls: urls
      }
    });
  }

}
