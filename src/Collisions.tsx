import { RefObject } from 'react';
import { RenderableElement } from './RenderableElement';
import { ElementPair } from './ElementPair';
import { PairSet } from './PairSet';
import { Vector } from './Components/Vector';
import { FakedDOMRect } from '../test/FakedDOMRect';
import { parseVelocityVectorAttribute } from '../test/ParseTransform';
import { MockedRect } from '../test/unit/MockedRect';
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
    
    addAllElementsIntersectedWith(element: RefObject<SVGSVGElement> | RenderableElement, addTo: PairSet): PairSet
    {
        const elements = this.__getElements();
        for(let j = 0; j < elements.length; j++)
        {
            const other = elements[j];
            if (element != elements[j] && this.isColliding(element, other))
            {
                if (!addTo.has(new ElementPair(element, other)))
                {
                    addTo.add(element, other);
                }
            }
        }
        return addTo;
    }

    checkTrackedForCollisions() : PairSet
    {
        let colliding = new PairSet();
        const elements = this.__getElements();
        for(let i = 0; i < elements.length; i++)
        {
            const element = elements[i]
            colliding = this.addAllElementsIntersectedWith(element, colliding);
        }
        return colliding;
    }
    isRectangleDefined(obj: Partial<MockedRect> | undefined): obj is MockedRect {
        return (
          obj !== undefined &&
          obj.right !== undefined &&
          obj.left !== undefined &&
          obj.top !== undefined &&
          obj.bottom !== undefined &&
          obj.width !== undefined &&
          obj.height !== undefined
        );
    }
    calculateOverlap(rect1: MockedRect | undefined, rect2: MockedRect| undefined): [number | undefined, number | undefined]
    {
        if (this.isRectangleDefined(rect1) && this.isRectangleDefined(rect2))
        {
            const center1 = new Vector(rect1.left! + (rect1.right! - rect1.left!), rect1.top! + (rect1.bottom! - rect1.top!));
            const center2  = new Vector(rect2.left! + (rect2.right! - rect2.left!), rect2.top! + (rect2.bottom! - rect2.top!));
            let overlapX = Math.abs(Math.abs(center1.x - center2.x) - (rect1.width! + rect2.width!) / 2);
            let overlapY = Math.abs(Math.abs(center1.y - center2.y) - (rect1.height! + rect2.height!) / 2);
            if(center1.x < center2.x)
            {
                overlapX = -overlapX
            }
            if(center1.y < center2.y)
            {
                overlapY = -overlapY
            }
            return [overlapX, overlapY];
        }
        return [undefined, undefined];
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
                const transformText = pair.first.current?.getAttribute("data-velocityvector");
                const secondTransform = pair.second.current?.getAttribute("data-velocityvector");

                const firstVector = parseVelocityVectorAttribute(transformText);
                const secondVector = parseVelocityVectorAttribute(secondTransform);

                const overlaps = this.calculateOverlap(pair.first.current?.getBoundingClientRect(), pair.second.current?.getBoundingClientRect());
                const boundingBoxOverlapX = overlaps[0];
                const boundingBoxOverlapY = overlaps[1];
                const normalizedX = +((boundingBoxOverlapX || 0) > 0) - +((boundingBoxOverlapX || 0) < 0);
                const normalizedY = +((boundingBoxOverlapY || 0) > 0) - +((boundingBoxOverlapY || 0) < 0);
                
                const newVector = [];
                newVector.push(new Vector(Math.abs(firstVector[0]) * normalizedX , Math.abs(firstVector[1])* normalizedY));
                newVector.push(new Vector(-Math.abs(secondVector[0]) * normalizedX, -Math.abs(secondVector[1]) * normalizedY));
                vectors.push(newVector);
            }
        }
        
        return vectors;
    }
}
