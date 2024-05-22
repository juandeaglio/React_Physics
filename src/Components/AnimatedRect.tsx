import { useState, useEffect, RefObject, forwardRef } from 'react';
import styled from 'styled-components';

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
  ref?: RefObject<SVGRectElement>;
  velocityVector?: Vector;
  moreProps?: GenericProps;
}

export class Vector
{
  x: number;
  y: number;
  constructor(x?: number, y?:number)
  {
    if(x){
      this.x = x;
    }
    else
    {
      this.x = 0;
    }
    
    if(y){
      this.y = y;
    }
    else
    {
      this.y = 0;
    }
  }
}

export const AnimatedRect = forwardRef<SVGRectElement, AnimatedRectProps>((props, ref) => {
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
      style={
        {
          transform: transform,
          transition: transition
        }}
    >
      <Rect ref={ref}/> 
    </svg>
  );
});
