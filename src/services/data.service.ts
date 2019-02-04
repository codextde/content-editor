import { Injectable } from '@angular/core';
import { ClearfixElementConfig } from 'src/components/elements/clearfix/clearfix.config';
import { DividerElementConfig } from 'src/components/elements/divider/divider.config';
import { HeadlineElementConfig } from 'src/components/elements/headline/headline.config';
import { HtmlElementConfig } from 'src/components/elements/html/html.config';
import { ImageElementConfig } from 'src/components/elements/image/image.config';
import { TextElementConfig } from 'src/components/elements/text/text.config';
import { VideoElementConfig } from 'src/components/elements/video/video.config';
import { IElement } from 'src/models/element.model';
import { ElementService } from './element.service';
import { IContentItem } from 'src/models/contentItem.model';
import { IContentItemProperty } from 'src/models/contentItemProperty.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  bodyPropertiesTypes = ['css', 'background', 'direction', 'padding'];

  contentEditorProperties: any = [];
  contentEditorElements: any = [];

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
    "Type": "content-editor",
    "Content": "",
    "DisplayOrder": 3,
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
    window['contentEditorData'] = this.designerData;

    this.convertToContenteditor();
  }

  convertToContenteditor() {
    const designerData = JSON.parse(localStorage.getItem('content')) || window['contentEditorData'];
    // Load Content Editor Body Styles
    for (const property of designerData.ContentItemProperties) {
      this.contentEditorProperties.push(JSON.parse(property.Value));
    }

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

      this.contentEditorElements.push(convertedElement);

    }

  }

  convertToDesigner() {
    // tslint:disable-next-line:prefer-const
    let designerData: IContentItem = {
      Type: 'content-editor',
      Items: [],
      ContentItemProperties: []
    };

    // Load Content Item Content Editor Properties
    this.contentEditorProperties.forEach((property: any) => {
      const contentItemProperty: IContentItemProperty = {
        ContentItemPropertyType: property.name,
        Value: JSON.stringify(property)
      };
      // Add Property only if values are in the Object
      if ( Object.keys(property).length > 1) {
        designerData.ContentItemProperties.push(contentItemProperty);
      }
    });

    // Add Content Items to Content Editor Element
    this.contentEditorElements.forEach((element: IElement) => {
      const contentItem: IContentItem = {
        Type: element.component,
        Content: element.value,
        ContentItemProperties: []
      };
      element.properties.forEach((property: any) => {
        const contentItemProperty: IContentItemProperty = {
          ContentItemPropertyType: property.name,
          Value: JSON.stringify(property)
        };
        // Add Property only if values are in the Object
        if ( Object.keys(property).length > 1) {
          contentItem.ContentItemProperties.push(contentItemProperty);
        }
      });
      designerData.Items.push(contentItem);
    });

    localStorage.setItem('content', JSON.stringify(designerData));
    console.log('designerData', designerData);
    return designerData;
  }
}
