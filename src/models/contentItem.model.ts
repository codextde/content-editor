import { IContentItemProperty } from './contentItemProperty.model';

export interface IContentItem {
    Id?: number;
    Align?: 'Left' | 'Center' | 'Right';
    IsDeleted?: boolean;
    Type: string;
    Content?: string;
    Items?: Array<IContentItem>;
    DisplayOrder?: number;
    ContentItemProperties?: Array<IContentItemProperty>;
    RefItemUnitId?: number;
}
