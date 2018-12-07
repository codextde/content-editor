import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { faAlignCenter, faArrowsAlt, faCode, faFont, faHandPointer, faImage, faImages, faTh, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {

  editorOptions: any = {
    id: 1,
    name: 'Layout 1',
    bodyStyleOptions: {
      paddingTop: '10px',
      paddingRight: '10px',
      paddingBottom: '30px',
      paddingLeft: '10px',
      backgroundColor: '#273142',
      font: {
        family: 'Tahoma, Geneva, sans-serif',
        size: 16,
        weight: 'normal',
        color: '#4d4d4d'
      },
      direction: 'ltr',
      width: 600
    },
    elements: []
  };

  faTrash = faTrash;
  faHandPointer = faHandPointer;
  faArrowsAlt = faArrowsAlt;


  tab: string = 'elements';


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

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  openProperties() {
    console.log('open properties');
  }

  delete(element) {
    console.log(element);
    // tslint:disable-next-line:triple-equals
    this.editorOptions.elements = this.editorOptions.elements.filter((el) => el.component  ==  element.title);
  }



}
