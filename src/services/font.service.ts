import { Injectable } from '@angular/core';
import * as WebFont from 'webfontloader';

@Injectable({
    providedIn: 'root'
  })
export class FontService {

    fonts = [{
        displayName: 'Open Sans',
        fontFamily: '"Open Sans"'
      }, {
        displayName: 'Comic Sans MS',
        fontFamily: '"comic sans ms", sans-serif'
      }];

    constructor() {
        let webFontsLoader = [];
        this.fonts.forEach((font) => {
            webFontsLoader.push(font.fontFamily);
        })
        // Load Fonts
        WebFont.load({
            custom: {
                families: webFontsLoader
            }
        });
    }

}
