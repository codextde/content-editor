import { Injectable } from '@angular/core';
import { HeadlineElementConfig } from 'src/components/elements/headline/headline.config';
import { HtmlElementConfig } from 'src/components/elements/html/html.config';
import { TextElementConfig } from 'src/components/elements/text/text.config';
import { VideoElementConfig } from 'src/components/elements/video/video.config';
import { ImageElementConfig } from 'src/components/elements/image/image.config';
import { ClearfixElementConfig } from 'src/components/elements/clearfix/clearfix.config';
import { DividerElementConfig } from 'src/components/elements/divider/divider.config';



@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  elements = [];

  constructor() {
    this.elements.push(HeadlineElementConfig.config);
    this.elements.push(TextElementConfig.config);
    this.elements.push(HtmlElementConfig.config);
    this.elements.push(VideoElementConfig.config);
    this.elements.push(ImageElementConfig.config);
    this.elements.push(ClearfixElementConfig.config);
    this.elements.push(DividerElementConfig.config);
  }
}
