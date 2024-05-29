
export function parseTransform(transform: string | undefined): number[] {
    if (transform === undefined)
    {
        return [NaN,NaN];
    }
    const valuesRegex = "\\(.*\\)";
    const splitValues: string[] = transform.match(valuesRegex)![0].split(',');
    const digitsOnlyX: string = splitValues[0].match(/(\\-*\d+)|(\d+)/)![0];
    const digitsOnlyY: string = splitValues[1].match(/(\\-*\d+)|(\d+)/)![0];


    const elements = [parseInt(digitsOnlyX), parseInt(digitsOnlyY)];
    return elements;
}
