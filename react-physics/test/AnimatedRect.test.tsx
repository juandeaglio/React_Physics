// test/AnimatedRect.test.tsx
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { ReactNode, useRef } from 'react';
import {render, screen} from '@testing-library/react';
import { AnimatedRect } from '../src/AnimatedRect';

interface AppProps {
    children?: ReactNode;
}

function App({children}: AppProps)
{
    const rect1 = useRef<SVGRectElement>(null);

    return(
        <div>
            <AnimatedRect ref={rect1} />
            {children}
        </div>
    );
}

test('shows an animatedrect', () => {
    const testMessage = 'Test Message'
    render(<App>{testMessage}</App>)

    expect(screen.queryAllByRole("animatable")[0]).toBeVisible();
})