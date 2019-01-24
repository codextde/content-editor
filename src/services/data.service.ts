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

  // tslint:disable:quotemark
  designerData: any =  [
    {
      "Id": 125,
      "Type": "layout-editor",
      "Content": "asdasdasd",
      "DisplayOrder": 1,
      "ContentItemPropertys": [
        {
          "Value": "\"{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}\"",
          "ContentItemPropertyType": "padding"
        }
      ]
    },
    {
      "Id": 126,
      "Type": "text",
      "Content": "Test text",
      "DisplayOrder": 1,
      "ContentItemPropertys": [
        {
          "Value": "\"{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}\"",
          "ContentItemPropertyType": "padding"
        }
      ]
    },
    {
      "Id": 127,
      "Type": "html",
      "Content": "<h1>Hallo</h1>",
      "DisplayOrder": 1,
      "ContentItemPropertys": [
        {
          "Value": "\"{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}\"",
          "ContentItemPropertyType": "padding"
        }
      ]
    }
  ];

  constructor() { }
}
