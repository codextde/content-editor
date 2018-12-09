import { Injectable } from '@angular/core';
import { faAlignCenter, faFont, faCode, faImage, faVideo, faImages, faTh } from '@fortawesome/free-solid-svg-icons';
import { IPaddingProperty } from 'src/components/properties/models/padding.model';
import { ITextProperty } from 'src/components/properties/models/text.model';


export class IElement {
  component: string;
  icon: any;
  title: string;
  properties: any[];
  value: string;
}



@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  textElement: IElement = {
    component: 'text',
    icon: faAlignCenter,
    title: 'Text',
    properties: [{
        name: 'text',
        color: '#000',
        align: 'left',
        height: '100%',
        familie: 'Arial',
        size: '12px'
      }, {
        name: 'padding',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    ],
    value: 'Hallo'
  };

  elements = [
    {
      component: 'headline',
      icon: faFont,
      title: 'Headline'
    },
    {
      component: 'html',
      icon: faCode,
      title: 'HTML'
    },
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
  ];


  constructor() {
    this.elements.push(this.textElement);
  }
}
