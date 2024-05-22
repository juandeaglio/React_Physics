// test/AnimatedRect.test.tsx
import '@testing-library/jest-dom'
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { StaticCollidable } from '../src/Components/StaticCollidable';
import { createdMockedGetBoundingClientRect } from './unit/Collision.test';
import { RenderableElement } from '../src/Components/Collisions';
interface AppProps {
    children?: ReactNode;
}

const rect = new RenderableElement(createdMockedGetBoundingClientRect(-100, 0, 100, 1000));

function App({children}: AppProps)
{
    //const barrier1 = useRef<SVGRectElement>(null);
    return(
        <div>
            <StaticCollidable
                //ref={barrier1}
                data-testid="Barrier-1"
                barrierProps={rect} 
            >
            </StaticCollidable>
            
            <p>
                x={rect.current.getBoundingClientRect().x}
            </p>
            <p>
                y={rect.current.getBoundingClientRect().y}
            </p>
            <p>
                width={rect.current.getBoundingClientRect().width}
            </p>
            <p>
                height={rect.current.getBoundingClientRect().height}
            </p>
            {children}
        </div>
    );
}

describe('animatedrect component', () => {
    test('shows a static barrier', () => {
        const testMessage = 'Test Message'
        render(<App>{testMessage}</App>)

        expect(screen.queryAllByRole("impervious")[0]).toBeVisible();
    })

    test('static barrier is positionable', () => {
        render(<App></App>); 
        
        const element = screen.getByTestId("Barrier-1");
        
        expect(element).toBeVisible();

        const x = screen.getByText(`x=${rect.current.getBoundingClientRect().x}`);
        expect(x).toBeVisible();
        
        const y = screen.getByText(`y=${rect.current.getBoundingClientRect().y}`);
        expect(y).toBeVisible();

        const width = screen.getByText(`width=${rect.current.getBoundingClientRect().width}`);
        expect(width).toBeVisible();

        const height = screen.getByText(`height=${rect.current.getBoundingClientRect().height}`);
        expect(height).toBeVisible();
    })
});
