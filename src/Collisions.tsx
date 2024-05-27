import { RefObject } from 'react';
import { RenderableElement } from './RenderableElement';
export interface ManagedArray {
    references?: Array<RefObject<SVGSVGElement> | RenderableElement>; // refactorable?
}

export class Collisions{
    elements: Array<RefObject<SVGSVGElement> | RenderableElement>;
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

    trackElement(element: RefObject<SVGSVGElement> | RenderableElement)
    {
        this.elements.push(element);
    }

    __getElements(): Array<RefObject<SVGSVGElement> | RenderableElement>  
    {
        return this.elements;
    }

    isColliding(element: RefObject<SVGSVGElement> | RenderableElement, 
        otherElement : RefObject<SVGSVGElement> | RenderableElement) : boolean
    {
        const rect1 = element.current?.getBoundingClientRect();
        const rect2 = otherElement.current?.getBoundingClientRect();
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

    checkTrackedForCollisions() : Set<RefObject<SVGSVGElement> | RenderableElement>
    {
        const colliding = new Set<RefObject<SVGSVGElement> | RenderableElement>([]);
        const elements = this.__getElements();
        for(let i = 0; i < elements.length; i++)
        {
            for(let j = 0; j < elements.length; j++)
            {
                const element = elements[i]
                if (element != elements[j])
                {
                    const other = elements[j];
                    if (!colliding.has(other) && this.isColliding(element, other))
                    {
                        colliding.add(other);
                    }
                }
            }
        }
        return colliding;
    }
}
