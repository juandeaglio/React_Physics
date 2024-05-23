import { RefObject, useEffect } from "react"
import { RenderableElement } from "./Components/Collisions"
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
    top: RenderableElement | RefObject<SVGRectElement>,
    bottom: RenderableElement | RefObject<SVGRectElement>,
    left: RenderableElement | RefObject<SVGRectElement>,
    right: RenderableElement | RefObject<SVGRectElement>,
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
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
    })
    return barriers
}