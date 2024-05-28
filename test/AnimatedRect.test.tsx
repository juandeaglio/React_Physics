// test/AnimatedRect.test.tsx
import '@testing-library/jest-dom'
import { ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { AnimatedRect } from '../src/Components/AnimatedRect';
import {describe, test} from '@jest/globals';
import { FakedDOMRect } from './FakedDOMRect';
import { Vector } from '../src/Components/Vector';

interface AppProps {
    children?: ReactNode;
}

function App({children}: AppProps)
{
    const rect1 = useRef<SVGSVGElement>(null);
    return(
        <div>
            <AnimatedRect ref={rect1} 
                velocityVector={new Vector(Math.sqrt(100/2), Math.sqrt(100/2))} 
                moreProps={{
                    "data-testid": "Box-1", 
                    transition: "transform 1s linear 0s"
                    }}
            />
            {children}
        </div>
    );
}


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

        const actualTransition = element.style.transition;
        expect(actualTransition).toBe("transform 1s linear 0s");

    })
});