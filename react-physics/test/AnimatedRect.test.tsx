// test/AnimatedRect.test.tsx
import '@testing-library/jest-dom'
import { ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { AnimatedRect } from '../src/AnimatedRect';
import {describe, test} from '@jest/globals';

interface AppProps {
    children?: ReactNode;
}

function App({children}: AppProps)
{
    const rect1 = useRef<SVGRectElement>(null);
    return(
        <div>
            <AnimatedRect ref={rect1} velocityVector={{x: Math.sqrt(100/2), y: Math.sqrt(100/2) }} moreProps={{"data-testid": "Box-1"}}/>
            {children}
        </div>
    );
}

class FakedDOMRect{
    x: number;
    y: number;
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;

    constructor(x:number , y:number, width:number, height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
      }
}

/*function getFakedDocumentRect(): FakedDOMRect
{
    const faked: FakedDOMRect =  new FakedDOMRect(0, 0, 1920, 1080);
    return faked;
}*/

function getFakedClientRect(virtualElement: Element | null): FakedDOMRect | undefined
{
    if(virtualElement)
    {
        return new FakedDOMRect(0, 0, 100, 100);
    }
    else
    {
        return undefined;
    }
}

describe('animatedrect component', () => {
    test('shows an animatedrect', () => {
        const testMessage = 'Test Message'
        render(<App>{testMessage}</App>)

        expect(screen.queryAllByRole("animatable")[0]).toBeVisible();
    })

    test('Animated Rect animated rightwards.', () => {
        render(<App></App>);
        // mock rect matches the transform after 1 second. sqrt(100)/2 x & y components
        // Mock this so that we have a mocked clientRect.
        const element = screen.getByTestId("Box-1");

        // Mocked clientRect with values mapped from velocityVector attribute
        const boundingClientRect = getFakedClientRect(element) as DOMRect;

        const expectedXTransform: number = Math.sqrt(100/2) + boundingClientRect.left;
        const expectedYTransform: number = expectedXTransform;
        const expectedTransform: string= `translate(${expectedXTransform}px, ${expectedYTransform}px)`;
        const actualTransform = element.style.transform;
        expect(actualTransform).toBe(expectedTransform);
    })
});