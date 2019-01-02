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
      css: '.test {\n display: none;\n}',
      styles: {
        'paddingLeft.px': 30,
        'paddingTop.px': 30,
        'paddingRight.px': 30,
        'paddingBottom.px': 30
      },
      directionLtr: true
    },
    elements: []
  };

  constructor() { }
}
