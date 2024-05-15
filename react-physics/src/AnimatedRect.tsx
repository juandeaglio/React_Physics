import { RefObject, forwardRef } from 'react';
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

export const AnimatedRect= forwardRef<SVGRectElement, AnimatedRectProps>((props, ref) => {
  let currentVector: Vector;
  if(props.velocityVector)
  {
    currentVector = props.velocityVector;
  }
  else
  {
    currentVector = new Vector();
  }
  
  return (
    <svg data-testid={props.moreProps?.['data-testid']} role="animatable"  style={{transform: `translate(${currentVector.x}px, ${currentVector.y}px)`}}>
      <Rect ref={ref}/> 
    </svg>
  );
});
