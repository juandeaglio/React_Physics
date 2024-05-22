import { RefObject, useEffect } from "react"
import { RenderableElement } from "./Components/Collisions"
import { createdMockedgetBoundingClientRect } from "../test/unit/Collision.test";

export function generateViewport(width: number, height: number): ViewportBarriers
{    
    const barrierHeight: number = 100;
    const barrierWidth: number = 100;
    return {
        top: new RenderableElement(createdMockedgetBoundingClientRect(0, -barrierHeight, width, barrierHeight)),
        bottom: new RenderableElement(createdMockedgetBoundingClientRect(0, height, width, barrierHeight)),
        left: new RenderableElement(createdMockedgetBoundingClientRect(-100, 0, barrierWidth, height)),
        right: new RenderableElement(createdMockedgetBoundingClientRect(width, 0, barrierWidth, height)),
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