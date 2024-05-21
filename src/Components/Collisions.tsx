import { RefObject } from 'react';
import { MockedRect } from '../../test/unit/Collision.test';
export interface ManagedArray {
    references?: Array<RefObject<SVGRectElement> | RenderableElement>; // refactorable?
}

export class RenderableElement{
    current: any
    constructor(elemRect: () =>  MockedRect)
    {
        this.current = {getBoundingClientRect: elemRect}   
    }
}

export class Collisions{
    elements: Array<RefObject<SVGRectElement> | RenderableElement>;
    totalCollisions = 0;
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

    trackElement(element: RefObject<SVGRectElement> | RenderableElement)
    {
        this.elements.push(element);
    }

    __getElements(): Array<RefObject<SVGRectElement> | RenderableElement>  
    {
        return this.elements;
    }

    isColliding(element: RefObject<SVGRectElement> | RenderableElement, 
        otherElement : RefObject<SVGRectElement> | RenderableElement) : boolean
    {
        const rect1 = element.current.getBoundingClientRect();
        const rect2 = otherElement.current.getBoundingClientRect();
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x) {
          // Check if the rectangles' y-coordinates overlap
          if (rect1.y < rect2.y + rect2.height &&
              rect1.y + rect1.height > rect2.y) {
            // The rectangles overlap
            this.totalCollisions += 1;
            return true;
          }
        }
        return false
    }

}
