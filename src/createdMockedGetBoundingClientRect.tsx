
export function createdMockedGetBoundingClientRect(x: number, y: number, width: number, height: number) {
        return function () {
                return {
                        x,
                        y,
                        width,
                        height,
                        top: y,
                        right: x + width,
                        bottom: y + height,
                        left: x,
                };
        };
}
