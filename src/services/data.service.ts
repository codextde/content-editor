import { Injectable } from '@angular/core';
import { faICursor } from '@fortawesome/free-solid-svg-icons';
import { TextElementConfig } from 'src/components/elements/text/text.config';
import { IElement } from 'src/models/element.model';
import { VideoElementConfig } from 'src/components/elements/video/video.config';
import { ImageElementConfig } from 'src/components/elements/image/image.config';
import { HtmlElementConfig } from 'src/components/elements/html/html.config';
import { HeadlineElementConfig } from 'src/components/elements/headline/headline.config';
import { DividerElementConfig } from 'src/components/elements/divider/divider.config';
import { ClearfixElementConfig } from 'src/components/elements/clearfix/clearfix.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  layoutEditorProperties: any;
  layoutEditorElements: any = [];

  editorOptions: any = {
    elements: []
  };
  editorDefaultOptions: any = {
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
      "DisplayOrder": 1,
      "ContentItemProperties": [
        {
          "Value": "{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}",
          "ContentItemPropertyType": "padding"
        },
        {
          "Value": ".test {\n display: none;\n}",
          "ContentItemPropertyType": "css"
        },
        {
          "Value": "rtl",
          "ContentItemPropertyType": "direction"
        }
      ]
    },
    {
      "Id": 126,
      "Type": "text",
      "Content": "Blaaaa",
      "DisplayOrder": 1,
      "ContentItemProperties": [
        {
          "Value": "{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}",
          "ContentItemPropertyType": "padding"
        }
      ]
    }
  ];


  defaultLayoutEditorProperties = {
    css: '.test {\n display: none;\n}',
    styles: {
      'paddingLeft.px': 30,
      'paddingTop.px': 30,
      'paddingRight.px': 30,
      'paddingBottom.px': 30
    },
    directionLtr: true
  };

  constructor() {
    // @Todo Remove and load from the Designer. The Designer need to Inject the Data to the iFrame
    window['layoutEditorData'] = this.designerData;
    this.convertToLayouteditor();
  }

  convertToLayouteditor() {
    let designerData = window['layoutEditorData'];

    // Load Layout Editor Body Styles
    const contentItemName = 'layout-editor';
    const layoutEditorContentItem = designerData.find((item) => {
      return item.Type == contentItemName;
    });
    if (layoutEditorContentItem) {
      this.layoutEditorProperties = layoutEditorContentItem.ContentItemProperties;
    } else {
      this.layoutEditorProperties = this.defaultLayoutEditorProperties;
    }
    designerData = designerData.filter(item => item.Type !== contentItemName);

    // Load Elements
    for (const element of designerData) {
      let convertedElement: IElement;

      if (element.Type == 'text') {
        convertedElement = TextElementConfig.newElement();
      }
      if (element.Type == 'video') {
        convertedElement = VideoElementConfig.newElement();
      }
      if (element.Type == 'image') {
        convertedElement = ImageElementConfig.newElement();
      }
      if (element.Type == 'html') {
        convertedElement = HtmlElementConfig.newElement();
      }
      if (element.Type == 'headline') {
        convertedElement = HeadlineElementConfig.newElement();
      }
      if (element.Type == 'divider') {
        convertedElement = DividerElementConfig.newElement();
      }
      if (element.Type == 'clearfix') {
        convertedElement = ClearfixElementConfig.newElement();
      }

      // Set Value of Element
      convertedElement.value = element.Content;

      // Load Properties
      for (const property of element.ContentItemProperties) {
        // Find Property from Element
        let foundProperty = convertedElement.properties.find((data) => {
          return data.name == property.ContentItemPropertyType;
        });

        // Merge Designer Property with Element Property
        if (typeof foundProperty === 'object') {
          const propertyValue = JSON.parse(property.Value);
          foundProperty = {...foundProperty, ...propertyValue};
        }
        const propertyIndex = convertedElement.properties.findIndex((data) => {
          return data.name == property.ContentItemPropertyType;
        });

        // Set new Property to the Element
        convertedElement.properties[propertyIndex] = foundProperty;
      }

      this.layoutEditorElements.push(convertedElement);

    }

  }

  convertToDesigner() {
    console.log(this.layoutEditorProperties);
    console.log(this.layoutEditorElements);
    return;
  }
}
