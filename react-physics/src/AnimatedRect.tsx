import { RefObject, forwardRef } from 'react';
import styled from 'styled-components';

export const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;

export interface AnimatedRectProps {
  ref?: RefObject<SVGRectElement>;
}

export const AnimatedRect= forwardRef<SVGRectElement, AnimatedRectProps>((_, ref) => {
  return (
    <svg role="animatable"  style={{}}>
      <Rect ref={ref} /> 
    </svg>
  );
});
