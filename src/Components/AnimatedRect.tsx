import { useState, useEffect, RefObject, forwardRef, MutableRefObject } from 'react';
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
  left?: string;
  moreProps?: GenericProps;
}

export const AnimatedRect = forwardRef<SVGSVGElement, AnimatedRectProps>((props, ref) => {
  const [transform, setTransform] = useState<string>("");
  const [transition, setTransition] = useState<string>("");
  const [initialSet, setInitial] = useState<boolean>(false);
  const [resetSet, setReset] = useState<boolean>(false);
  const [animateSet, setAnimate] = useState<boolean>(false);
  const [completeSet, setComplete] = useState<boolean>(false);

  const [left, setLeft] = useState<string>(props.left || "0px");

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

  function setNewInitialPosition(ref: MutableRefObject<SVGSVGElement | null>) {
    if (ref.current) 
    {
      const boundingRect = ref.current?.getBoundingClientRect();
      if (boundingRect?.left !== undefined)
      {
        console.log("1: Left", boundingRect?.left);
        console.log("1: Transform", transform);
        console.log("1: Transition", transition);
        setLeft(boundingRect.left.toString())
        setTransform(`translate(${0}px, ${0}px)`);
        setTransition(`transform ${0}s linear ${0}s`);
      }
    }
  }

  useEffect(() =>
  {
    if(initialSet)
    {
      if (ref && typeof ref !== 'function') 
      {
        requestAnimationFrame(() => {
          setNewInitialPosition(ref);    
          setInitial(false);
          setReset(true);
        });
      }
    }
  }, [initialSet])

  function resetTransformAnimation(ref: MutableRefObject<SVGSVGElement | null>) 
  {
    if (ref.current) 
    {
      
      console.log("2: Transform", transform);
      console.log("2: Transition", transition);
      setTransition(`transform ${1}s linear ${0}s`);
    }
  }
  
  useEffect(() =>
  {
    if(resetSet)
    {
      if (ref && typeof ref !== 'function') 
      {
        requestAnimationFrame(() => {
          resetTransformAnimation(ref);
          setReset(false);
          setAnimate(true);
        });
      }
    }
  }, [resetSet])

    
  function setNewAnimation(ref: MutableRefObject<SVGSVGElement | null>) 
  {
    if (ref.current) 
    {
      console.log("3: Transform", transform);
      console.log("3: Transition", transition);
      setTransform(`translate(${props.velocityVector?.x}px, ${props.velocityVector?.y}px)`);
      setAnimate(true);
    }
  }

  useEffect(() =>
  {
    if(animateSet)
    {
      if (ref && typeof ref !== 'function') 
      {
        requestAnimationFrame(() => {
          setNewAnimation(ref);
          setAnimate(false);
          setComplete(true);
        });
      }
    }
  }, [animateSet])
  
  useEffect(() => {
    if(completeSet)
    {
      if (ref && typeof ref !== 'function') 
      {
        if (ref.current) 
        {
          const boundingRect = ref.current?.getBoundingClientRect();
          if (boundingRect?.left !== undefined)
          {
            console.log("Done: Left", boundingRect?.left);
            console.log("Done: Transform", transform);
            console.log("Done: Transition", transition);
          }
        }
        setComplete(false);
      }
    }
  }, [completeSet])

  useEffect(() => {
    addEventListener("transitionend", () => {
      setInitial(true);
    });
  })
  
  return (
    <svg 
      data-testid={props.moreProps?.['data-testid']} 
      width="100px"
      height="100px"
      role="animatable"
      ref={ref}
      style={
        {
          position: "absolute",
          left: left,
          transform: transform,
          transition: transition
        }}
    >
      <Rect /> 
    </svg>
  );
});
