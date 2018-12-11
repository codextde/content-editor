import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  editorOptions: any = {};
  editorDefaultOptions: any = {
    id: 1,
    name: 'Layout 1',
    bodyStyleOptions: {
      css: '.test {\n  display: none\n}',
      padding: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
      },
      background: {
        color: '#fff',
        image: '',
        repeat: 'no-repeat',
        size: 'cover',
      },
      directionLtr: true
    },
    elements: []
  };

  constructor() { }
}
