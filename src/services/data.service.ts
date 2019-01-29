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
import { ElementService } from './element.service';

export class IBodyProperties {
  styles?: any;
  css?: any;
  direction?: any;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  layoutEditorProperties: any = [];
  layoutEditorElements: any = [];

  bodyProperties: IBodyProperties = {
    styles: {},
    css: {},
    direction: {}
  };


  // tslint:disable:quotemark
  designerData: any = {
    "Items": [
      {
        "Id": 137,
        "Type": "text",
        "Content": "blablieblug",
        "DisplayOrder": 0,
        "ContentItemProperties": [
          {
            "Value": "{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}",
            "ContentItemPropertyType": "padding"
          }
        ]
      }
    ],
    "Id": 135,
    "Type": "layout-editor",
    "Content": "",
    "DisplayOrder": 3,
    "_cid": 0,
    "ContentItemProperties": [
      {
        "Value": "{\"name\":\"padding\",\"paddingLeft.px\":4,\"paddingTop.px\":5,\"paddingRight.px\":2,\"paddingBottom.px\":5}",
        "ContentItemPropertyType": "padding"
      },
      {
        "Value": "{\"name\":\"background\", \"background-color\": \"#6b4e4e\"}",
        "ContentItemPropertyType": "background"
      },
      {
        "Value": "{\"name\":\"css\", \"value\": \".test{}\"}",
        "ContentItemPropertyType": "css"
      },
      {
        "Value": "{\"name\":\"direction\", \"value\": \"ltr\"}",
        "ContentItemPropertyType": "direction"
      }

    ]
  };

  constructor(
    private elementService: ElementService
  ) {
    // @Todo Remove and load from the Designer. The Designer need to Inject the Data to the iFrame
    window['layoutEditorData'] = this.designerData;
    this.convertToLayouteditor();
  }

  convertToLayouteditor() {
    const designerData = window['layoutEditorData'];


    // Load Layout Editor Body Styles
    for (const property of designerData.ContentItemProperties) {
      this.layoutEditorProperties.push(JSON.parse(property.Value));
    }
    this.bodyProperties.styles = this.elementService.loadStyleProperties(this.layoutEditorProperties);
    this.bodyProperties.css = this.layoutEditorProperties.find((data) => data.name == 'css');
    this.bodyProperties.direction = this.layoutEditorProperties.find((data) => data.name == 'direction');


    // Load Elements
    for (const element of designerData.Items) {
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

      console.log(this.layoutEditorElements, this.layoutEditorProperties, this.bodyProperties);

    }

  }

  convertToDesigner() {
    console.log(this.layoutEditorProperties);
    console.log(this.layoutEditorElements);
    return;
  }
}
