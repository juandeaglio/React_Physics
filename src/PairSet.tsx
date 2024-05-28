import { RefObject } from "react";
import { ElementPair } from './ElementPair';
import { RenderableElement } from "./RenderableElement";


export class PairSet {
    pairs: Set<ElementPair>;
    constructor() {
        this.pairs = new Set();
    }

    add(first: RefObject<SVGSVGElement | RenderableElement>, second: RefObject<SVGSVGElement | RenderableElement>) {
        const pair = new ElementPair(first, second);
        if (!this.has(pair)) {
            this.pairs.add(pair);
        }
    }

    has(pair: ElementPair) {
        for (const p of this.pairs) {
            if (p.equals(pair)) {
                return true;
            }
        }
        return false;
    }

    getPairs() {
        return Array.from(this.pairs);
    }

    get size()
    {
        return this.pairs.size;
    }
}
