import { RefObject, useEffect } from "react"
import { RenderableElement } from './RenderableElement';
import { createdMockedGetBoundingClientRect } from './createdMockedGetBoundingClientRect';

export function generateViewport(width: number, height: number, barrierHeight: number, barrierWidth: number): ViewportBarriers
{
    return {
        top: new RenderableElement(createdMockedGetBoundingClientRect(0, -barrierHeight, width, barrierHeight)),
        bottom: new RenderableElement(createdMockedGetBoundingClientRect(0, height, width, barrierHeight)),
        left: new RenderableElement(createdMockedGetBoundingClientRect(-barrierWidth, 0, barrierWidth, height)),
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

export function useWindowAsCollisionBarriers(barriers: ViewportBarriers | undefined, setBarriers: React.Dispatch<React.SetStateAction<ViewportBarriers | undefined>>, 
    barrierWidth: number, barrierHeight: number)
{
    useEffect(() =>
    {
        // Add window boundaries.
        function handleResize()
        {
            setBarriers(generateViewport(window.innerHeight, window.innerWidth, barrierWidth, barrierHeight));
        }
        handleResize();
        window.addEventListener("resize", handleResize);
    })
    return barriers
}