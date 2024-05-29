import { RefObject } from 'react';
import { RenderableElement } from './RenderableElement';
import { ElementPair } from './ElementPair';
import { PairSet } from './PairSet';
import { Vector } from './Components/Vector';
import { FakedDOMRect } from '../test/FakedDOMRect';
import { parseTransform } from '../test/ParseTransform';
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

    private isHorizontallyOverlapping(rect1: FakedDOMRect, rect2: FakedDOMRect): boolean {
        if (rect1.x !== undefined && rect1.width !== undefined && rect2.x !== undefined && rect2.width !== undefined)
        {        
            return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        }
        else
        {
            return false;
        }
    }

    private isVerticallyOverlapping(rect1: FakedDOMRect, rect2: FakedDOMRect): boolean {
        if (rect1.y !== undefined && rect1.height !== undefined && rect2.y !== undefined && rect2.height !== undefined )
        {        
            return rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        }
        else
        {
            return false;
        }
    }

    isColliding(element: RefObject<SVGSVGElement> | RenderableElement, 
                otherElement: RefObject<SVGSVGElement> | RenderableElement): boolean {
        const rect1 = element.current?.getBoundingClientRect();
        const rect2 = otherElement.current?.getBoundingClientRect();

        if (rect1 && rect2) {
            const horizontalOverlap = this.isHorizontallyOverlapping(rect1, rect2);
            const verticalOverlap = this.isVerticallyOverlapping(rect1, rect2);
            
            if (horizontalOverlap && verticalOverlap) {
                this.totalCollisions += 1;
                return true;
            }
        }
        return false;
    }
    
    checkTrackedForCollisions() : PairSet
    {
        const colliding = new PairSet();
        const elements = this.__getElements();
        for(let i = 0; i < elements.length; i++)
        {
            for(let j = 0; j < elements.length; j++)
            {
                const element = elements[i]
                if (element != elements[j])
                {
                    const other = elements[j];
                    if(this.isColliding(element, other))
                    {
                        if (!colliding.has(new ElementPair(element, other)))
                        {
                            colliding.add(element, other);
                        }
                    }
                }
            }
        }
        return colliding;
    }
    calculateVectorsWithCollisions(collisions: PairSet): Array<Array<Vector>>
    {
        const vectors: Array<Array<Vector>> = [];
        const pairArray = collisions.getPairs();
        for(let i = 0; i < collisions.size; i++)
        {
            const pair: ElementPair = pairArray[i];
            if (pair.first.current !== undefined && pair.second.current !== undefined)
            {
                const transformText = pair.first.current?.style.transform;
                const secondTransform = pair.second.current?.style.transform;
                const firstVector = parseTransform(transformText);
                const secondVector = parseTransform(secondTransform);
                let firstComponent;
                let secondComponent;

                if(!Number.isNaN(firstVector[0]) && !Number.isNaN(secondVector[0]))
                {
                    firstComponent = firstVector[0] - secondVector[0];
                    secondComponent = firstVector[1] - secondVector[1];
                }
                else if(Number.isNaN(firstVector[0]) && Number.isNaN(secondVector[0]))
                {
                    firstComponent = 0
                    secondComponent = 0
                }
                else if(Number.isNaN(secondVector[0]) )
                {
                    firstComponent = -firstVector[0]
                    secondComponent = -firstVector[1]
                }
                else
                {
                    firstComponent = -secondVector[0]
                    secondComponent = -secondVector[1]
                }
                vectors.push([new Vector(firstComponent, secondComponent), new Vector(-firstComponent, - secondComponent)]);
            }
        }
        
        return vectors;
    }
}
