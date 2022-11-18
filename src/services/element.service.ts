import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ElementService {
    constructor() {}

    loadStyleProperties(properties) {
        const padding = properties.find(property => {
            return property.name == 'padding';
        });
        const general = properties.find(property => {
            return property.name == 'general';
        });
        const text = properties.find(property => {
            return property.name == 'text';
        });
        const background = properties.find(property => {
            return property.name == 'background';
        });
        const position = properties.find(property => {
            return property.name == 'position';
        });
        return { ...general, ...padding, ...text, ...background, ...position };
    }
}
