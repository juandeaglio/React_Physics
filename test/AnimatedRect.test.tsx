// test/AnimatedRect.test.tsx
import '@testing-library/jest-dom'
import { ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { AnimatedRect } from '../src/Components/AnimatedRect';
import {describe, test} from '@jest/globals';
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

describe('animatedrect component', () => {
    test('shows an animatedrect', () => {
        const testMessage = 'Test Message'
        render(<App>{testMessage}</App>)
        const element = screen.queryAllByRole("animatable")[0];
        expect(element).toBeVisible();
        expect(element).toHaveAttribute('data-velocityvector')
    })

});