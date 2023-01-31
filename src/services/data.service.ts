import { Injectable } from '@angular/core';
import { ClearfixElementConfig } from 'components/elements/clearfix/clearfix.config';
import { DividerElementConfig } from 'components/elements/divider/divider.config';
import { HeadlineElementConfig } from 'components/elements/headline/headline.config';
import { HtmlElementConfig } from 'components/elements/html/html.config';
import { ImageElementConfig } from 'components/elements/image/image.config';
import { TextElementConfig } from 'components/elements/text/text.config';
import { VideoElementConfig } from 'components/elements/video/video.config';
import { IContentItem } from 'models/contentItem.model';
import { IContentItemProperty } from 'models/contentItemProperty.model';
import { IElement } from 'models/element.model';
import { ElementService } from './element.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    bodyPropertiesTypes = ['css', 'background', 'direction', 'padding'];

    contentEditorProperties: any = [];
    contentEditorElements: any = [];

    designerData: any = {};

    constructor() {
        this.convertToContenteditor();
    }

    convertToContenteditor() {
        const designerData = JSON.parse(localStorage.getItem('content'));
        if (!designerData) {
            return;
        }
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
                let foundProperty = convertedElement.properties.find(data => {
                    return data.name == property.ContentItemPropertyType;
                });

                // Merge Designer Property with Element Property
                if (typeof foundProperty === 'object') {
                    const propertyValue = JSON.parse(property.Value);
                    foundProperty = { ...foundProperty, ...propertyValue };
                }
                const propertyIndex = convertedElement.properties.findIndex(
                    data => {
                        return data.name == property.ContentItemPropertyType;
                    }
                );

                // Set new Property to the Element
                convertedElement.properties[propertyIndex] = foundProperty;
            }

            this.contentEditorElements.push(convertedElement);
        }
    }

    convertToDesigner() {
        console.log(this.contentEditorElements, this.contentEditorProperties);
        // tslint:disable-next-line:prefer-const
        let designerData: IContentItem = {
            Type: 'content-editor',
            Items: [],
            ContentItemProperties: [],
        };

        // Load Content Item Content Editor Properties
        this.contentEditorProperties.forEach((property: any) => {
            const contentItemProperty: IContentItemProperty = {
                ContentItemPropertyType: property.name,
                Value: JSON.stringify(property),
            };
            // Add Property only if values are in the Object
            if (Object.keys(property).length > 1) {
                designerData.ContentItemProperties.push(contentItemProperty);
            }
        });

        // Add Content Items to Content Editor Element
        this.contentEditorElements.forEach((element: IElement) => {
            const contentItem: IContentItem = {
                Type: element.component,
                Content: element.value,
                ContentItemProperties: [],
            };
            element.properties.forEach((property: any) => {
                const contentItemProperty: IContentItemProperty = {
                    ContentItemPropertyType: property.name,
                    Value: JSON.stringify(property),
                };
                // Add Property only if values are in the Object
                if (Object.keys(property).length > 1) {
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
