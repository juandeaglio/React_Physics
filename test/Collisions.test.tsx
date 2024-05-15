// test/Collisions.test.tsx
import '@testing-library/jest-dom'

import { ReactNode, useRef, useEffect } from 'react';
import {render} from '@testing-library/react';
import { AnimatedRect} from '../src/AnimatedRect';
import { Collisions } from '../src/Collisions';
import {describe, test} from '@jest/globals';

interface AppProps {
    children?: ReactNode;
}


function App({children}: AppProps)
{
    const rect1 = useRef<SVGRectElement>(null); // I predict type is going to change, consider abstract
    const collisionListener: Collisions = new Collisions();
    useEffect(() => 
    {
        collisionListener.trackElement(rect1);
    },)
    return(
        <div>
            <p data-testd="rect1">
                {collisionListener.__getElements()[0]?.current.getClientBoundingRect().left || 0}
            </p>
            <div>
                <AnimatedRect ref={rect1} velocityVector={{x: Math.sqrt(100)/2, y: Math.sqrt(100)/2 }}/>
                {children}
            </div>
        </div>
    );
}

describe('collisions class', () => {
    test('We check for a collision with the left edge of screen', () => {
        render(<App></App>);
    })
});