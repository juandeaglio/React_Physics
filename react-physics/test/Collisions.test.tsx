// test/Collisions.test.tsx
import '@testing-library/jest-dom'

import { RefObject, ReactNode, useRef } from 'react';
import {render} from '@testing-library/react';
import { AnimatedRect} from '../src/AnimatedRect';
import { Collisions } from '../src/Collisions';

interface AppProps {
    children?: ReactNode;
}


function App({children}: AppProps)
{
    const rect1 = useRef<SVGRectElement>(null); // this type is going to change, lets abstract
    const rect2 = useRef<SVGRectElement>(null);

    const managed: Array<RefObject<SVGRectElement>> = [rect1, rect2];
    return(
        <div>
            <Collisions references={managed}/>
            <div>
                <AnimatedRect ref={rect1}/>
                <AnimatedRect ref={rect2}/>
                {children}
            </div>
        </div>
    );
}


test('Detect collisions between two boxes', () => {
    render(<App></App>)
})
