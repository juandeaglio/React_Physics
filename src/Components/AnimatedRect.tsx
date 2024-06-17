import { useState, useEffect, RefObject, forwardRef, CSSProperties, useRef, useReducer } from 'react';
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
  startingPos?: Vector;
  left?: string;
  moreProps?: GenericProps;
}

interface UpdateVectorAction {
  type: 'UPDATE_VECTOR';
  payload: {
    velocityVector: Vector;
    targetFrameRate: number;
  };

}
type VectorAction = UpdateVectorAction;

const vectorReducer = (state: Vector, action: VectorAction) => {
  if (action.type === 'UPDATE_VECTOR') {
    const { velocityVector, targetFrameRate } = action.payload;
    return state.add(
      new Vector(
        (velocityVector.x || 0) / targetFrameRate,
        (velocityVector.y || 0) / targetFrameRate
      )
    );
  }
  return state;
};


export const AnimatedRect = forwardRef<SVGSVGElement, AnimatedRectProps>((props, ref) => {
  const [style, setStyle] = useState<CSSProperties>({position: "absolute", left:"0px", bottom:"0px"});
  const renderedVector = useRef<Vector>();
  const [startingPos, setStartingPos] = useState<Vector>(new Vector(0,0));

  const [vector, dispatch] = useReducer(vectorReducer, startingPos);

  useEffect(() => {
    if(props.startingPos)
    {
      setStartingPos(props.startingPos);
    }
  }, [props.startingPos])

  useEffect(() => {
    // process every frame 60 frames per second
    const targetFrameRate = 60;
    let frameId: number;

    function updateValues()
    {
      if(props.velocityVector !== undefined && renderedVector.current !== undefined  && props.velocityVector.x !== undefined && props.velocityVector.y !== undefined)
      {
        dispatch({
          type: 'UPDATE_VECTOR',
          payload: {
            velocityVector: props.velocityVector,
            targetFrameRate,
          },
        });
      }
      setStyle({position: "absolute", left: `${vector.x}px`, bottom: `${vector.y}px`})
      frameId = requestAnimationFrame(updateValues);
    }
    frameId = requestAnimationFrame(updateValues);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [props.velocityVector, vector.x, vector.y]);

  useEffect(() => {
    renderedVector.current = vector;
  }, [vector])
  
  
  return (
    <svg 
      data-velocityvector={`${props.velocityVector?.x}, ${props.velocityVector?.y}`}
      data-testid={props.moreProps?.['data-testid']}
      width="100px"
      height="100px"
      role="animatable"
      ref={ref}
      style={style}
    >
      <Rect /> 
    </svg>
  );
});
