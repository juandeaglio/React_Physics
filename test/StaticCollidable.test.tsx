// test/AnimatedRect.test.tsx
import '@testing-library/jest-dom'
import { ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { StaticCollidable } from '../src/Components/StaticCollidable';
import { createdMockedGetBoundingClientRect } from '../src/createdMockedGetBoundingClientRect';
import { RenderableElement } from '../src/RenderableElement';
interface AppProps {
    children?: ReactNode;
}

const rect = new RenderableElement(createdMockedGetBoundingClientRect(-100, 0, 100, 1000));

function App({children}: AppProps)
{
    const ref = useRef<SVGSVGElement>(null);
    return(
        <div>
            <StaticCollidable
                //ref={barrier1}
                data-testid="Barrier-1"
                barrierProps={rect}
                ref={ref}
            >
            </StaticCollidable>
            
            <p>
                x={rect.current?.getBoundingClientRect().x}
            </p>
            <p>
                y={rect.current?.getBoundingClientRect().y}
            </p>
            <p>
                width={rect.current?.getBoundingClientRect().width}
            </p>
            <p>
                height={rect.current?.getBoundingClientRect().height}
            </p>
            {children}
        </div>
    );
}

function UndefinedBarrier()
{
    const ref = useRef<SVGSVGElement>(null);
    return(
        <div>
            <StaticCollidable
                //ref={barrier1}
                data-testid="Barrier-1"
                barrierProps={undefined}
                ref={ref}
            >
            </StaticCollidable>
        </div>
    );
}

describe('animatedrect component', () => {
    test('shows a static barrier', () => {
        const testMessage = 'Test Message'
        render(<App>{testMessage}</App>)

        expect(screen.queryAllByRole("impervious")[0]).toBeVisible();
    })

    test('create a barrier with no props', () => {
        render(<UndefinedBarrier></UndefinedBarrier>)

        expect(screen.queryAllByRole("impervious")[0]).toBeVisible();
    })


    test('static barrier is positionable', () => {
        render(<App></App>); 
        
        const element = screen.getByTestId("Barrier-1");
        
        expect(element).toBeVisible();

        const x = screen.getByText(`x=${rect.current!.getBoundingClientRect().x}`);
        expect(x).toBeVisible();
        
        const y = screen.getByText(`y=${rect.current!.getBoundingClientRect().y}`);
        expect(y).toBeVisible();

        const width = screen.getByText(`width=${rect.current!.getBoundingClientRect().width}`);
        expect(width).toBeVisible();

        const height = screen.getByText(`height=${rect.current!.getBoundingClientRect().height}`);
        expect(height).toBeVisible();
    })
});
