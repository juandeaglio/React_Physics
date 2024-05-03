import { RefObject } from 'react';
import { MockedRect } from '../test/unit/Collision.test';
export interface ManagedArray {
    references?: Array<RefObject<SVGRectElement> | RenderableElement>; // refactorable?
}

export class RenderableElement{
    current: any
    constructor(elemRect: () =>  MockedRect)
    {
        this.current = {getClientBoundingRect: elemRect}   
    }
}

export class Collisions{
    elements: Array<RefObject<SVGRectElement> | RenderableElement>;
    constructor(managed?: ManagedArray){
        if(managed && managed.references)
        {
            this.elements = managed.references;
        }
        else
        {
            this.elements = [];
        }
    }

    add(element: RefObject<SVGRectElement> | RenderableElement)
    {
        this.elements.push(element);
    }

    __getElements(): Array<RefObject<SVGRectElement> | RenderableElement>  
    {
        return this.elements;
    }
}
