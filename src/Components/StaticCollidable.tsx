import { RenderableElement } from '../RenderableElement';
import { forwardRef, RefObject } from "react";

export interface StaticProps{
    "data-testid"?: string;
    barrierProps?: RenderableElement | RefObject<SVGRectElement>
}

export const StaticCollidable = forwardRef<SVGSVGElement, StaticProps>((testProps: StaticProps, ref) => {
    return(
        <svg
        ref={ref}
        style={{
            position: "absolute", 
            left: testProps.barrierProps?.current?.getBoundingClientRect().x,
            top: testProps.barrierProps?.current?.getBoundingClientRect().y,
        }}
        x={testProps.barrierProps?.current?.getBoundingClientRect().x} 
        y={testProps.barrierProps?.current?.getBoundingClientRect().y} 
        width={testProps.barrierProps?.current?.getBoundingClientRect().width} 
        height={testProps.barrierProps?.current?.getBoundingClientRect().height} 
        role="impervious" 
        data-testid={testProps["data-testid"]}>
            <rect>
            </rect>
        </svg>
    )
});