import { Injectable } from '@angular/core';
import { TextElementConfig } from 'src/components/elements/text/text.config';
import { HtmlElementConfig } from 'src/components/elements/html/html.config';
import { HeadlineElementConfig } from 'src/components/elements/headline/headline.config';



@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  elements = [];

  /**
   *
    {
      component: 'svg',
      icon: faImage,
      title: 'SVG'
    },
    {
      component: 'video',
      icon: faVideo,
      title: 'Video'
    },
    {
      component: 'image',
      icon: faImages,
      title: 'Image'
    },
    {
      component: 'grid',
      icon: faTh,
      title: 'Grid'
    }
   */


  constructor() {
    this.elements.push(HeadlineElementConfig.config);
    this.elements.push(TextElementConfig.config);
    this.elements.push(HtmlElementConfig.config);
  }
}
