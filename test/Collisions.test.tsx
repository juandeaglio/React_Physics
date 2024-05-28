// test/Collisions.test.tsx
import '@testing-library/jest-dom'

import { ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { AnimatedRect} from '../src/Components/AnimatedRect';
import { screen } from '@testing-library/dom';
import { Collisions } from '../src/Collisions';
import { RenderableElement } from '../src/RenderableElement';
import { createdMockedGetBoundingClientRect } from '../src/createdMockedGetBoundingClientRect';
import { ViewportBarriers, generateViewport} from '../src/ViewportBarriers';
import { ScreenLimitations } from './ScreenLimitations';
import { parseTransform } from './ParseTransform';
import { Vector } from '../src/Components/Vector';

interface AppProps {
    children?: ReactNode;
}

function App({children}: AppProps)
{
    const rect1 = useRef<SVGSVGElement>(null); // I predict type is going to change, consider abstract

    const screenWidth = new ScreenLimitations().screenWidth;
    const rectWidth = new ScreenLimitations().rectWidth;
    return(
        <div>
            <div>
                <AnimatedRect moreProps={{"data-testid": "Box-1"}} ref={rect1} velocityVector={new Vector(screenWidth - rectWidth + 1,0)}/>
                {children}
            </div>
        </div>
    );
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