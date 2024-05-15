import {describe, expect, test} from '@jest/globals';
import { Collisions, RenderableElement } from '../../src/Collisions';
import { ManagedArray } from '../../src/Collisions';


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
export function mockedGetClientBoundingRect(): MockedRect {
        const top = 0;
        const left = 0;
        const right = 100;
        const bottom = 100;
        return { 
                top: top,
                left: left,
                right: right,
                bottom: bottom,
                width: (right-left),
                height: (bottom-top),
                x: left,
                y: top,
        }
}

describe('collisions class', () => {
        test('Collisions takes in array of elements', () => {
                const empty: ManagedArray = {references: []};
                expect(new Collisions(empty)).toBeTruthy();
        });
        test('Collisions contains a single renderableElement', () => {
                const elem: RenderableElement = new RenderableElement(mockedGetClientBoundingRect);
                const collisions = new Collisions();
                collisions.trackElement(elem);
                expect(collisions.__getElements()[0].current.getClientBoundingRect().width).toBe(100);
                expect(collisions.__getElements()[0].current.getClientBoundingRect().height).toBe(100);
        });
});