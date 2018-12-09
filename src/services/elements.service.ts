import { Injectable } from '@angular/core';
import { faAlignCenter, faFont, faCode, faImage, faVideo, faImages, faTh } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  elements = [
    {
      component: 'text',
      icon: faAlignCenter,
      title: 'Text'
    },
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


  constructor() { }
}
