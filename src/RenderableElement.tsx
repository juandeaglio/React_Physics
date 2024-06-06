import { MockedRect } from '../test/unit/MockedRect';

export interface AttributesMap
{
    "data-velocityvector"?: Map<string, string>,
}

export interface RenderableElementType {
    getBoundingClientRect: () => MockedRect;
    getAttribute: (key: string) => string | undefined;
}

export class RenderableElement {
    current: RenderableElementType | null = null;
    constructor(elemRect: () => MockedRect, vector?: string ) {
        const velocityVector = new Map<string, string>();
        if (vector !== undefined)
        {
            velocityVector.set("data-velocityvector", vector);
        }
        else
        {
            velocityVector.set("data-velocityvector", "0,0");
        }
        this.current = { 
            getBoundingClientRect: elemRect, 
            getAttribute: (key: string) => velocityVector.get(key),
        };
    }
}
