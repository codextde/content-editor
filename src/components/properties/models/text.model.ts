export class ITextProperty {
    name?: string;
    color?: string;
    align?: string;
    lineHeight?: string;
    fontFamily?: {
        displayName: string;
        fontFamily: string;
    };
    size?: {
        value: number;
        format: string;
    };
    weight?: string;
}
