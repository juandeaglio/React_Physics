import { useState, useRef, useEffect } from 'react';
import { AnimatedRect } from '../../src/Components/AnimatedRect';
import { Vector } from '../../src/Components/Vector';
import { Collisions } from '../../src/Collisions';
import { PairSet } from '../../src/PairSet';


const initialVector = new Vector(100,0);
const initialSecondVector = new Vector(300,0);
const tolerance: number = 5.0; // Adjust this value based on your requirements


function Test4() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const rect2 = useRef<SVGSVGElement>(null);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [collidedElements, setCollidedElements] = useState<PairSet>();
  const [vectorState, setVectorState] = useState<Vector>(new Vector(0,0));
  const [secondVectorState, setSecondVectorState] = useState<Vector>(new Vector(0,0));
  const [stopMeasuring, setStop] = useState<boolean>(false);
  const [startingPositionsInitialized, setStartPosInit] = useState<boolean>(false);
  const collisionDetector = useRef<Collisions | null>(null);
  const positionsInitialized = useRef<boolean>(false);

  useEffect(() =>
  {
    let set = 0;
    function animationLoop()
    { 
      if(rect1.current?.style !== undefined && rect1.current.style.left !== undefined
        && rect1.current.style.bottom !== undefined &&
        rect2.current?.style !== undefined && rect2.current.style.left !== undefined
        && rect1.current.style.bottom !== undefined)
      {
        const rect1Left = parseFloat(rect1.current.style.left);
        const rect1Bottom = parseFloat(rect1.current.style.bottom);
        const rect2Left = parseFloat(rect2.current.style.left);
        const rect2Bottom = parseFloat(rect2.current.style.bottom);        
        if(!positionsInitialized.current && Math.abs(rect1Left - initialVector.x) <= tolerance
          && Math.abs(rect1Bottom - initialVector.y) <= tolerance
          && Math.abs(rect2Left - initialSecondVector.x) <= tolerance
          && Math.abs(rect2Bottom - initialSecondVector.y) <= tolerance)
        {
          setStartPosInit(true);
        }
      }
      if(!stopMeasuring)
      {
        if (startingPositionsInitialized)
        {
          const collided = collisionDetector.current?.checkTrackedForCollisions()
        
          if(set != collisionDetector.current?.totalCollisions)
          {
            set = collisionDetector.current?.totalCollisions || 0;
            setCollisionCount(collisionDetector.current?.totalCollisions || 0);
            setCollidedElements(collided);
          }
        }
        requestAnimationFrame(animationLoop);
      }
      else
      {
        setVectorState(new Vector(0, 0)); 
        setSecondVectorState(new Vector(0, 0)); 
      }
    }
    requestAnimationFrame(animationLoop) // enables collision checking
  })

  useEffect(() => {
    if (rect1.current !== null && rect2.current !== null) {
        collisionDetector.current = new Collisions({references: [rect1, rect2]});
    }
  }, [rect1, rect2]);

  useEffect(() =>
  {
    if(collidedElements !== undefined && collidedElements.size > 0)
    {
      const newVectors: Array<Array<Vector>> | undefined = collisionDetector.current?.calculateVectorsWithCollisions(collidedElements);
      if (newVectors !== undefined)
      {
        console.log("Collision detected: ", newVectors);
        setVectorState(newVectors[0][0]);
        setSecondVectorState(newVectors[0][1]);
      }
    }
  }, [collidedElements])

  useEffect(() =>
  {
    setVectorState(new Vector(100, 0));
    setSecondVectorState(new Vector(-100, 0));
    function stopSimulating()
    {
      setStop(true);
    }
    setTimeout(stopSimulating, 2000);
  }, [])

  return (
    <>
      <AnimatedRect ref={rect1} velocityVector={vectorState} startingPos={initialVector}
        moreProps={
          {
            "data-testid": "Box-1",
          }
        }
      />
      <AnimatedRect ref={rect2} velocityVector={secondVectorState} startingPos={initialSecondVector} 
        moreProps={
          {
            "data-testid": "Box-2",
          }
        }
      />
      <p data-testid="collision-counter">
        {collisionCount}
      </p>
    </>
  )
}

export default Test4