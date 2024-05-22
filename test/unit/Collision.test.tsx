
import { Collisions, RenderableElement } from '../../src/Components/Collisions';
import { ManagedArray } from '../../src/Components/Collisions';

export function createdMockedGetBoundingClientRect(x: number, y: number, width: number, height: number) {
        return function () {
                return {
                x,
                y,
                width,
                height,
                top: y,
                right: x + width,
                bottom: y + height,
                left: x,
                };
        }
}

export interface MockedRect{
        x: number;
        y: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
}


describe('collisions class', () => {
        test('Collisions takes in array of elements', () => {
                const empty: ManagedArray = {references: []};
                expect(new Collisions(empty)).toBeTruthy();
        });
        test('Collisions contains a single renderableElement', () => {
                const elem: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(0,0,100,100));
                const collisions = new Collisions();
                collisions.trackElement(elem);
                expect(collisions.__getElements()[0].current.getBoundingClientRect().width).toBe(100);
                expect(collisions.__getElements()[0].current.getBoundingClientRect().height).toBe(100);
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
});