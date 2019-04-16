import {Injectable} from '@angular/core';
import {ClearfixElementConfig} from 'src/components/elements/clearfix/clearfix.config';
import {DividerElementConfig} from 'src/components/elements/divider/divider.config';
import {HeadlineElementConfig} from 'src/components/elements/headline/headline.config';
import {HtmlElementConfig} from 'src/components/elements/html/html.config';
import {ImageElementConfig} from 'src/components/elements/image/image.config';
import {TextElementConfig} from 'src/components/elements/text/text.config';
import {VideoElementConfig} from 'src/components/elements/video/video.config';
import {IContentItem} from 'src/models/contentItem.model';
import {IContentItemProperty} from 'src/models/contentItemProperty.model';
import {IElement} from 'src/models/element.model';
import {ElementService} from './element.service';
import {EventsService} from './event.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  bodyPropertiesTypes = ['css', 'background', 'direction', 'padding'];
  contentEditorProperties: any[] = [];
  contentEditorElements: any[] = [];
  originalDesignerData: any;

  contentEditorContentItem: any = {};

  constructor(
    private elementService: ElementService,
    private eventsService: EventsService
  ) {
    console.log(ImageElementConfig.config)
    // @Todo Remove and load from the Designer. The Designer need to Inject the Data to the iFrame
    // window['contentEditorData'] = this.designerData;

    // this.convertToContentEditor();
  }

  async convertToContentEditor(designerData) {
    console.log('designerData', designerData);
    this.originalDesignerData = JSON.parse(JSON.stringify(designerData));
    this.contentEditorProperties = [];
    this.contentEditorElements = [];
    // designerData = JSON.parse(designerData); // localStorage.getItem('content'))
    // Load Content Editor Body Styles

    this.contentEditorContentItem = {
      Id: designerData.Id,
      IsDeleted: false,
      RefItemUnitId: designerData.RefItemUnitId
    };


    if (designerData.ContentItemProperties) {
      for (const property of designerData.ContentItemProperties) {
        await this.contentEditorProperties.push(JSON.parse(property.Value));
      }
    }

    // Load Elements
    if (designerData.Items) {
      for (const element of designerData.Items) {
        console.log(element);
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

        convertedElement = {...convertedElement, ...element};

        // Set Value of Element
        convertedElement.value = element.Content;

        // Load Properties
        for (const property of element.ContentItemProperties) {

          property.ContentItemPropertyType = property.ContentItemPropertyType || this.getContentItemPropertyNamebyId(property.ContentItemPropertyTypeId);

          // Find Property from Element
          let foundProperty = convertedElement.properties.find((data) => {
            return data.name == property.ContentItemPropertyType;
          });

          // Merge Designer Property with Element Property
          if (typeof foundProperty === 'object') {
            const propertyValue = JSON.parse(property.Value);
            const idData = {
              ContentItemId: property.ContentItemId || 0,
              Id: property.Id || 0
            };
            foundProperty = {
              ...foundProperty,
              ...propertyValue,
              ...idData
            };
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

    console.log('this.contentEditorElements', this.contentEditorElements);

    this.eventsService.publish('body-properties-change');
  }

  convertToDesigner() {
    // tslint:disable-next-line:prefer-const
    let designerData: IContentItem = {
      IsDeleted: false,
      Id: 0,
      Type: 'content-editor',
      Items: [],
      ContentItemProperties: [],
      Align: 'Left'
    };

    designerData.Id = this.contentEditorContentItem.Id;
    designerData.IsDeleted = this.contentEditorContentItem.IsDeleted;
    designerData.RefItemUnitId = this.contentEditorContentItem.RefItemUnitId;

    // Load Content Item Content Editor Properties
    this.contentEditorProperties.forEach((property: any) => {
      const contentItemProperty: IContentItemProperty = {
        Id: property.Id || 0,
        ContentItemId: property.ContentItemId || 0,
        ContentItemPropertyType: property.name,
        Value: JSON.stringify(property),
        ContentItemPropertyTypeId: this.getContentItemPropertyTypeId(property.name)
      };
      // Add Property only if values are in the Object
      if (Object.keys(property).length > 1) {
        designerData.ContentItemProperties.push(contentItemProperty);
      }
    });

    // Add Content Items to Content Editor Element // TODO Update element Interface
    this.contentEditorElements.forEach((element: any) => {
      const contentItem: IContentItem = {
        Type: element.component,
        Content: element.value,
        ContentItemProperties: [],
        IsDeleted: false,
        Align: 'Left'
      };

      contentItem.Id = element.Id;
      contentItem.IsDeleted = element.IsDeleted;
      contentItem.RefItemUnitId = element.RefItemUnitId;

      // contentItem = {...contentItem, ...element};

      element.properties.forEach((property: any) => {
        const contentItemProperty: IContentItemProperty = {
          Id: property.Id,
          ContentItemId: property.ContentItemId,
          ContentItemPropertyType: property.name,
          Value: JSON.stringify(property),
          ContentItemPropertyTypeId: this.getContentItemPropertyTypeId(property.name)
        };
        // Add Property only if values are in the Object
        if (Object.keys(property).length > 1) {
          contentItem.ContentItemProperties.push(contentItemProperty);
        }
      });
      designerData.Items.push(contentItem);
    });

    if (this.originalDesignerData && this.originalDesignerData.Items) {
      for (const element of this.originalDesignerData.Items) {
        if (!designerData.Items.some(item => item.Id == element.Id)) {
          const contentItem: IContentItem = {
            ...element,
            IsDeleted: true
          };

          designerData.Items.push(contentItem);
        }
      }
    }
    // localStorage.setItem('content', JSON.stringify(designerData));
    console.log(designerData);
    return designerData;
  }

  getContentItemPropertyNamebyId(id) {
    // TODO Convert to Enum
    if (id == 1) {
      return 'background';
    }
    if (id == 2) {
      return 'border';
    }
    if (id == 3) {
      return  'css';
    }
    if (id == 4) {
      return 'divider';
    }
    if (id == 5) {
      return 'general';
    }
    if (id == 6) {
      return 'headline';
    }
    if (id == 7) {
      return 'html';
    }
    if (id == 8) {
      return 'image';
    }
    if (id == 9) {
      return 'initialLetter';
    }
    if (id == 10) {
      return  'margin';
    }
    if (id == 11) {
      return 'padding';
    }
    if (id == 12) {
      return  'position';
    }
    if (id == 13) {
      return 'text';
    }
  }

  getContentItemPropertyTypeId(name) {
    // TODO Convert to Enum
    if (name == 'background') {
      return 1;
    }
    if (name == 'border') {
      return 2;
    }
    if (name == 'css') {
      return 3;
    }
    if (name == 'divider') {
      return 4;
    }
    if (name == 'general') {
      return 5;
    }
    if (name == 'headline') {
      return 6;
    }
    if (name == 'html') {
      return 7;
    }
    if (name == 'image') {
      return 8;
    }
    if (name == 'initialLetter') {
      return 9;
    }
    if (name == 'margin') {
      return 10;
    }
    if (name == 'padding') {
      return 11;
    }
    if (name == 'position') {
      return 12;
    }
    if (name == 'text') {
      return 13;
    }
  }
}
