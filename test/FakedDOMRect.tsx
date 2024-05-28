export class FakedDOMRect {
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;
    left: number | undefined;
    right: number | undefined;
    top: number | undefined;
    bottom: number | undefined;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
    }
}
