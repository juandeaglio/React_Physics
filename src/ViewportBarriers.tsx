import { RefObject, useEffect } from "react"
import { RenderableElement } from './RenderableElement';
import { createdMockedGetBoundingClientRect } from './createdMockedGetBoundingClientRect';

export function generateViewport(width: number, height: number): ViewportBarriers
{    
    const barrierHeight: number = 100;
    const barrierWidth: number = 100;
    return {
        top: new RenderableElement(createdMockedGetBoundingClientRect(0, -barrierHeight, width, barrierHeight)),
        bottom: new RenderableElement(createdMockedGetBoundingClientRect(0, height, width, barrierHeight)),
        left: new RenderableElement(createdMockedGetBoundingClientRect(-100, 0, barrierWidth, height)),
        right: new RenderableElement(createdMockedGetBoundingClientRect(width, 0, barrierWidth, height)),
    }
}

export interface ViewportBarriers
{
    top: RenderableElement | RefObject<SVGSVGElement>,
    bottom: RenderableElement | RefObject<SVGSVGElement>,
    left: RenderableElement | RefObject<SVGSVGElement>,
    right: RenderableElement | RefObject<SVGSVGElement>,
}

export function useWindowAsCollisionBarriers(barriers: ViewportBarriers | undefined, setBarriers: React.Dispatch<React.SetStateAction<ViewportBarriers | undefined>>)
{
    useEffect(() =>
    {
        // Add window boundaries.
        function handleResize()
        {
            setBarriers(generateViewport(window.innerHeight, window.innerWidth));
        }
        handleResize();
        window.addEventListener("resize", handleResize);
    })
    return barriers
}