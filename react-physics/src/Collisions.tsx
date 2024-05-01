import { RefObject, useEffect } from "react";
import assert from 'assert';
export interface AnimatableElements{
    ref: RefObject<SVGRectElement>;
}

export interface CollisionsProps {
    references?: Array<RefObject<SVGRectElement>>; // refactorable?
}

export const Collisions: React.FC<CollisionsProps> = ({references}: CollisionsProps) => {
    const elements = references;
    useEffect(() => {
        assert(elements!.length > 0, 'must manage at least one element')
    }, []);
    return (
        <></>
    );
}
