import { IContentItemProperty } from './contentItemProperty.model';

export interface IContentItem {
    Type: string;
    Content?: string;
    Items?: Array<IContentItem>;
    DisplayOrder?: number;
    ContentItemProperties?: Array<IContentItemProperty>;
}
