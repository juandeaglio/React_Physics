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
    const rect1 = useRef<SVGRectElement>(null); // I predict type is going to change, consider abstract
    const rect2 = useRef<SVGRectElement>(null);

    const managed: Array<RefObject<SVGRectElement>> = [rect1, rect2];
    const collisionListener: Collisions = new Collisions({references: managed});
    return(
        <div>
            <p data-testd="rect1">
                {collisionListener.__getElements()[0]}
            </p>
            <div>
                <AnimatedRect ref={rect1}/>
                {children}
            </div>
        </div>
    );
}


test('Collisions reads position of a rect', () => {
    render(<App></App>)
})
