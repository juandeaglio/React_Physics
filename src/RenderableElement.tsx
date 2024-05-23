import { MockedRect } from "../test/unit/Collision.test";


export class RenderableElement {
    current: any;
    constructor(elemRect: () => MockedRect) {
        this.current = { getBoundingClientRect: elemRect };
    }
}
