import { useState, useEffect, RefObject, forwardRef } from 'react';
import styled from 'styled-components';
import { Vector } from './Vector';

export const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;
export interface GenericProps
{
  "data-testid"?: string;
  transition?: string;
}
export interface AnimatedRectProps {
  ref?: RefObject<SVGSVGElement>;
  velocityVector?: Vector;
  moreProps?: GenericProps;
}

export const AnimatedRect = forwardRef<SVGSVGElement, AnimatedRectProps>((props, ref) => {
  const [transform, setTransform] = useState<string>("");
  const [transition, setTransition] = useState<string>("");
  
  let currentVector: Vector;
  if(props.velocityVector)
  {
    currentVector = props.velocityVector;
  }
  else
  {
    currentVector = new Vector();
  }
  useEffect(() => 
  {
    if(ref)
    {
      setTransform(`translate(${currentVector.x}px, ${currentVector.y}px)`);
      const duration = 1;
      const delay = 0;
      setTransition(`transform ${duration}s linear ${delay}s`);
    }
  }, [ref, currentVector, props.moreProps])
  return (
    <svg 
      data-testid={props.moreProps?.['data-testid']} 
      role="animatable"
      ref={ref}
      style={
        {
          transform: transform,
          transition: transition
        }}
    >
      <Rect /> 
    </svg>
  );
});
