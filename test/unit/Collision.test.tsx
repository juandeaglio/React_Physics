
import { Collisions } from '../../src/Collisions';
import { RenderableElement } from '../../src/RenderableElement';
import { ManagedArray } from '../../src/Collisions';
import { createdMockedGetBoundingClientRect } from '../../src/createdMockedGetBoundingClientRect';
import { ElementPair } from '../../src/ElementPair';
import { Vector } from '../../src/Components/Vector';

describe('collisions class', () => {
        test('Collisions takes in array of elements', () => {
                const empty: ManagedArray = {references: []};
                expect(new Collisions(empty)).toBeTruthy();
        });

        test('Collisions contains a single renderableElement', () => {
                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100));
                const collisions = new Collisions();
                collisions.trackElement(elem);
                expect(collisions.__getElements()[0].current!.getBoundingClientRect().width).toBe(100);
                expect(collisions.__getElements()[0].current!.getBoundingClientRect().height).toBe(100);
        });

        test('Detects a single collision', () => {
                const collisions = new Collisions();

                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100));
                const overlappingElement: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(99,99,100,100));

                collisions.trackElement(elem);
                collisions.trackElement(overlappingElement);
                
                expect(collisions.isColliding(elem, overlappingElement)).toBe(true);
                expect(collisions.totalCollisions).toBe(1);
        });

        test('Find all collisions', () => {
                const collisions = new Collisions();

                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100));
                const overlappingElement: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(99,99,100,100));
                const nonOverlapping: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(349,349,1,1));

                collisions.trackElement(elem);
                collisions.trackElement(overlappingElement);
                collisions.trackElement(nonOverlapping);

                const collided = collisions.checkTrackedForCollisions();
                expect(collided.size).toBe(1);
                expect(collided.getPairs()[0].equals(new ElementPair(elem, overlappingElement))).toBe(true);

        });

        test('Find no collisions', () => {
                const collisions = new Collisions();

                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100));
                const nonOverlapping: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(349,349,1,1));

                collisions.trackElement(elem);
                collisions.trackElement(nonOverlapping);

                expect(collisions.checkTrackedForCollisions().size).toBe(0);
        });

        test('Returns 0 collisions from non-existent rectangles', () => {
                const collisions = new Collisions();

                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(undefined, undefined, undefined, undefined));
                const nonOverlapping: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(349,349,1,1));

                collisions.trackElement(elem);
                collisions.trackElement(nonOverlapping)
                
                expect(collisions.checkTrackedForCollisions().size).toBe(0);
        })

        test('Two equal forces collision', () => {
                const collisions = new Collisions();
                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100), {transform: `translate(${10}px, ${0}px)`});
                const overlappingElement: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(99,99,100,100), {transform: `translate(${-10}px, ${0}px)`});
                const newVectors = collisions.calculateVectorsWithCollisions([new ElementPair(elem, overlappingElement)]);
                expect(newVectors[0][0]).toEqual(new Vector(0, 0));
                expect(newVectors[0][1]).toEqual(new Vector(0, 0));
        })

        
        test('Two unequal forces collision', () => {
                const collisions = new Collisions();
                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100), {transform: `translate(${20}px, ${0}px)`});
                const overlappingElement: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(99,99,100,100), {transform: `translate(${-10}px, ${0}px)`});
                const newVectors = collisions.calculateVectorsWithCollisions([new ElementPair(elem, overlappingElement)]);
                expect(newVectors[0][0]).toEqual(new Vector(10, 0));
                expect(newVectors[0][1]).toEqual(new Vector(-10, 0));
        })
});