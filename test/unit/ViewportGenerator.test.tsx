// test/Collisions.test.tsx
import '@testing-library/jest-dom'
import { FakedDOMRect } from '../AnimatedRect.test';
import { generateViewport, ViewportBarriers } from '../../src/ViewportBarriers';
import { ScreenLimitations } from '../Collisions.test';
import { describe, expect, test} from '@jest/globals';


describe('generate viewports based on screen size', () => {
    const screenWidth = new ScreenLimitations().screenWidth;
    const screenHeight = new ScreenLimitations().screenHeight;

    const viewPortBarriers: ViewportBarriers = generateViewport(screenWidth,screenHeight)

    test('Generate top barrier on a 1000x1000 screen', () => {
        const topBarrier: FakedDOMRect = viewPortBarriers.top.current.getBoundingClientRect();
        expect(topBarrier.top).toBe(-100);
        expect(topBarrier.bottom).toBe(0);
        expect(topBarrier.left).toBe(0);
        expect(topBarrier.right).toBe(1000);
    })

    test('Generate right barrier on a 1000x1000 screen', () => {
        const rightBarrier: FakedDOMRect = viewPortBarriers.right.current.getBoundingClientRect();
        expect(rightBarrier.top).toBe(0);
        expect(rightBarrier.bottom).toBe(1000);
        expect(rightBarrier.left).toBe(1000);
        expect(rightBarrier.right).toBe(1100);
    })

    test('Generate bottom barrier on a 1000x1000 screen', () => {
        const bottomBarrier: FakedDOMRect = viewPortBarriers.bottom.current.getBoundingClientRect();
        expect(bottomBarrier.top).toBe(1000);
        expect(bottomBarrier.bottom).toBe(1100);
        expect(bottomBarrier.left).toBe(0);
        expect(bottomBarrier.right).toBe(1000);
    })

    test('Generate left barrier on a 1000x1000 screen', () => {
        const leftBarrier: FakedDOMRect = viewPortBarriers.left.current.getBoundingClientRect();
        expect(leftBarrier.top).toBe(0);
        expect(leftBarrier.bottom).toBe(1000);
        expect(leftBarrier.left).toBe(-100);
        expect(leftBarrier.right).toBe(0);
    })
});