
export function createdMockedGetBoundingClientRect(x: number | undefined, y: number | undefined, width: number | undefined, height: number | undefined) {
        return function () {
                if (x != undefined && y != undefined && width != undefined && height != undefined)
                {
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
                }
                else 
                {
                        return {
                                x: undefined,
                                y: undefined,
                                width: undefined,
                                height: undefined,
                                top: undefined,
                                right: undefined,
                                bottom: undefined,
                                left: undefined
                        }
                }
        };
}
