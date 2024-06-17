import { useState, useRef, useEffect } from 'react';
import { AnimatedRect } from '../../src/Components/AnimatedRect';
import { Vector } from '../../src/Components/Vector';
import { Collisions } from '../../src/Collisions';
import { PairSet } from '../../src/PairSet';


function Test4() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const rect2 = useRef<SVGSVGElement>(null);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [collidedElements, setCollidedElements] = useState<PairSet>();
  const [vectorState, setVectorState] = useState<Vector>(new Vector(0,0));
  const [secondVectorState, setSecondVectorState] = useState<Vector>(new Vector(0,0));
  const [stopMeasuring, setStop] = useState<boolean>(false);
  const collisionDetector = useRef<Collisions | null>(null);

  useEffect(() =>
  {
    let set = 0;
    function animationLoop()
    {
      if(!stopMeasuring)
      {
        const collided = collisionDetector.current?.checkTrackedForCollisions()
        if(set != collisionDetector.current?.totalCollisions)
        {
          set = collisionDetector.current?.totalCollisions || 0;
          setCollisionCount(collisionDetector.current?.totalCollisions || 0);
          setCollidedElements(collided);
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
    setTimeout(stopSimulating, 1500);
  }, [])

  return (
    <>
      <AnimatedRect ref={rect1} velocityVector={vectorState} startingPos={new Vector(100,0)}
        moreProps={
          {
            "data-testid": "Box-1",
          }
        }
      />
      <AnimatedRect ref={rect2} velocityVector={secondVectorState} startingPos={new Vector(300,0)} 
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