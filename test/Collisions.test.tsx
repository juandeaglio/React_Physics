// test/Collisions.test.tsx
import '@testing-library/jest-dom'

import { ReactNode, useRef } from 'react';
import {render} from '@testing-library/react';
import { AnimatedRect} from '../src/Components/AnimatedRect';
import { describe, expect, test} from '@jest/globals';
import { screen } from '@testing-library/dom';
import { Collisions, RenderableElement } from '../src/Components/Collisions';
import { createdMockedGetBoundingClientRect } from '../src/createdMockedGetBoundingClientRect';
import { ViewportBarriers, generateViewport} from '../src/ViewportBarriers';

interface AppProps {
    children?: ReactNode;
}

export class ScreenLimitations
{
    screenWidth = 1000;
    screenHeight = 1000;
    rectWidth = 100;
}

function App({children}: AppProps)
{
    const rect1 = useRef<SVGRectElement>(null); // I predict type is going to change, consider abstract

    const screenWidth = new ScreenLimitations().screenWidth;
    const rectWidth = new ScreenLimitations().rectWidth;
    return(
        <div>
            <div>
                <AnimatedRect moreProps={{"data-testid": "Box-1"}} ref={rect1} velocityVector={{x: screenWidth - rectWidth + 1, y: 0}}/>
                {children}
            </div>
        </div>
    );
}

function parseTransform(transform: string): number[]
{
    const valuesRegex = "\\(.*\\)";
    const splitValues: string[] = transform.match(valuesRegex)![0].split(',');
    const digitsOnlyX: string = splitValues[0].match(/\d+/)![0];
    const digitsOnlyY: string = splitValues[1].match(/\d+/)![0];
    
    
    const elements = [parseInt(digitsOnlyX), parseInt(digitsOnlyY)]
    return elements
}

describe('collisionCalculator class', () => {
    const screenWidth = new ScreenLimitations().screenWidth;
    const screenHeight = new ScreenLimitations().screenHeight;
    const rectWidth = new ScreenLimitations().rectWidth;

    const viewPortBarriers: ViewportBarriers = generateViewport(screenWidth,screenHeight)



    test('We check for a collision with the right edge of screen', () => {
        render(<App></App>);
        const element = screen.getByTestId("Box-1").style.transform;
        const xActual = parseTransform(element)[0];
        const box1Rect: RenderableElement = new RenderableElement(createdMockedGetBoundingClientRect(xActual, 0, rectWidth, rectWidth));
        const viewPortRect: RenderableElement = viewPortBarriers.right;
        const collisionCalculator = new Collisions();
    
        expect(collisionCalculator.isColliding(box1Rect, viewPortRect)).toBe(true);
    })
});