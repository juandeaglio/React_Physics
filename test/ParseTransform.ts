
export function parseTransform(transform: string | undefined): number[] {
    if (transform === undefined || transform === "")
    {
        return [NaN,NaN];
    }
    const splitValues: string[] = transform.split(',');

    let digitsOnlyX: string;
    let digitsOnlyY: string;
    if(splitValues.length == 1)
    {
        // Firefox specific behavior
        digitsOnlyX = splitValues[0]!.match(/(-*\d+)|(\d+)/)![0];
        digitsOnlyY = '0';
    }
    else
    {
        digitsOnlyX = splitValues[0]!.match(/(-*\d+)|(\d+)/)![0];
        digitsOnlyY = splitValues[1]!.match(/(-*\d+)|(\d+)/)![0];
    }

    const elements = [parseInt(digitsOnlyX), parseInt(digitsOnlyY)];
    return elements;
}
