import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  editorOptions: any = {
    id: 1,
    name: 'Layout 1',
    bodyStyleOptions: {
      css: '.test {\ndisplay: none\n}',
      padding: {
        top: '30px',
        right: '30px',
        bottom: '30px',
        left: '30px'
      },
      backgroundColor: '#fff',
      backgroundImage: '',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      font: {
        family: 'Tahoma, Geneva, sans-serif',
        size: 16,
        weight: 'normal',
        color: '#4d4d4d'
      },
      directionLtr: true
    },
    elements: []
  };

  constructor() { }
}
