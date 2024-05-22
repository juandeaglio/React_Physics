import { RenderableElement } from "./Collisions";
import { RefObject } from "react";

export interface StaticProps{
    "data-testid"?: string;
    barrierProps: RenderableElement | RefObject<SVGRectElement>
}

export const StaticCollidable = ((testProps: StaticProps) => {
    return(
        <svg 
        x={testProps.barrierProps.current.getBoundingClientRect().x} 
        y={testProps.barrierProps.current.getBoundingClientRect().y} 
        width={testProps.barrierProps.current.getBoundingClientRect().width} 
        height={testProps.barrierProps.current.getBoundingClientRect().height} 
        role="impervious" 
        data-testid={testProps["data-testid"]}>
            <rect>
            </rect>
        </svg>
    )
});