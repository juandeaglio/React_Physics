import { useRef } from 'react';
import styled from 'styled-components';

export const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;

export function AnimatedRect({...props }) {
    const boxRef = useRef<SVGRectElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    return (
        <svg role="animatable"  style={{'width': '100%','border': '1px solid black'}} ref={svgRef}>
            <Rect ref={boxRef} {...props} /> 
        </svg>
);
}
