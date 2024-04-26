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
    const numElementsRef = useRef<number>(1);
    return(
        <div>
            <p id='num-of-elements'>{numElementsRef.current}</p>
            <AnimatedRect numElementsRef={numElementsRef}></AnimatedRect>
            {children}
        </div>
    );
}

test('shows the children when the checkbox is checked', () => {
    const testMessage = 'Test Message'
    render(<App>{testMessage}</App>)
  
    // query* functions will return the element or null if it cannot be found
    // get* functions will return the element or throw an error if it cannot be found
    expect(screen.queryByText(testMessage)).toBeVisible()
  })