import { MockedRect } from '../test/unit/MockedRect';

export interface MockedStyle
{
    transform?: string,
}

export interface RenderableElementType {
    getBoundingClientRect: () => MockedRect;
    style: MockedStyle;
}

export class RenderableElement {
    current: RenderableElementType | null = null;
    constructor(elemRect: () => MockedRect, style?: MockedStyle ) {
        this.current = { 
            getBoundingClientRect: elemRect, 
            style: style || {},
        };
    }
}
