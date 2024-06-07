// test/Collisions.test.tsx
import '@testing-library/jest-dom'
import { FakedDOMRect } from '../FakedDOMRect';
import { generateViewport, ViewportBarriers } from '../../src/ViewportBarriers';
import { ScreenLimitations } from '../ScreenLimitations';


describe('generate viewports based on screen size', () => {
    const screenWidth = new ScreenLimitations().screenWidth;
    const screenHeight = new ScreenLimitations().screenHeight;
    const barrierWidthHeight = 100;
    let viewPortBarriers: ViewportBarriers;

    beforeEach(() => {
        viewPortBarriers = generateViewport(screenWidth,screenHeight, barrierWidthHeight, barrierWidthHeight);
    })

    test('Generate top barrier on a screen', () => {
        const topBarrier: FakedDOMRect = viewPortBarriers.top.current!.getBoundingClientRect();
        expect(topBarrier.top).toBe(-barrierWidthHeight);
        expect(topBarrier.bottom).toBe(0);
        expect(topBarrier.left).toBe(0);
        expect(topBarrier.right).toBe(screenWidth);
    })

    test('Generate right barrier on a screen', () => {
        const rightBarrier: FakedDOMRect = viewPortBarriers.right.current!.getBoundingClientRect();
        expect(rightBarrier.top).toBe(0);
        expect(rightBarrier.bottom).toBe(screenHeight);
        expect(rightBarrier.left).toBe(screenWidth);
        expect(rightBarrier.right).toBe(screenWidth+barrierWidthHeight);
    })

    test('Generate bottom barrier on a screen', () => {
        const bottomBarrier: FakedDOMRect = viewPortBarriers.bottom.current!.getBoundingClientRect();
        expect(bottomBarrier.top).toBe(screenHeight);
        expect(bottomBarrier.bottom).toBe(screenHeight+barrierWidthHeight);
        expect(bottomBarrier.left).toBe(0);
        expect(bottomBarrier.right).toBe(screenWidth);
    })

    test('Generate left barrier on a screen', () => {
        const leftBarrier: FakedDOMRect = viewPortBarriers.left.current!.getBoundingClientRect();
        expect(leftBarrier.top).toBe(0);
        expect(leftBarrier.bottom).toBe(screenHeight);
        expect(leftBarrier.left).toBe(-barrierWidthHeight);
        expect(leftBarrier.right).toBe(0);
    })
});