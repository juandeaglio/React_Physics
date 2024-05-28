import { RefObject } from "react";
import { RenderableElement } from "./RenderableElement";


export class ElementPair {
    first;
    second;
    constructor(first: RefObject<SVGSVGElement | RenderableElement>, second: RefObject<SVGSVGElement | RenderableElement>) {
        this.first = first;
        this.second = second;
    }

    equals(other: ElementPair) {
        return (
            this.first === other.first &&
            this.second === other.second ||
            this.first === other.second &&
            this.second === other.first
        );
    }
}
