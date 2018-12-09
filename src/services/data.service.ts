import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  editorOptions: any = {
    id: 1,
    name: 'Layout 1',
    bodyStyleOptions: {
      css: '.test {\n  display: none\n}',
      padding: {
        top: '30px',
        right: '30px',
        bottom: '30px',
        left: '30px'
      },
      background: {
        color: '#fff',
        image: '',
        repeat: 'no-repeat',
        size: 'cover',
      } ,
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
