import { MockedRect } from '../test/unit/MockedRect';


export class RenderableElement {
    current: any;
    constructor(elemRect: () => MockedRect) {
        this.current = { getBoundingClientRect: elemRect };
    }
}
