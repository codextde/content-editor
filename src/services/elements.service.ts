import { Injectable } from '@angular/core';
import { ButtonElementConfig } from 'components/elements/button/button.config';
import { ClearfixElementConfig } from 'components/elements/clearfix/clearfix.config';
import { DividerElementConfig } from 'components/elements/divider/divider.config';
import { HeadlineElementConfig } from 'components/elements/headline/headline.config';
import { HtmlElementConfig } from 'components/elements/html/html.config';
import { ImageElementConfig } from 'components/elements/image/image.config';
import { TextElementConfig } from 'components/elements/text/text.config';
import { VideoElementConfig } from 'components/elements/video/video.config';

@Injectable({
    providedIn: 'root',
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
        this.elements.push(ButtonElementConfig.config);
    }
}
