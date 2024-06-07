import { useState, useRef, useEffect } from 'react';
import { AnimatedRect } from '../../src/Components/AnimatedRect';
import { Vector } from '../../src/Components/Vector';
import { generateViewport, ViewportBarriers } from '../../src/ViewportBarriers';
import { StaticCollidable } from '../../src/Components/StaticCollidable';
import { Collisions } from '../../src/Collisions';
import { PairSet } from '../../src/PairSet';


function Test2() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [collidedElements, setCollidedElements] = useState<PairSet>();
  const [vectorState, setVectorState] = useState<Vector>(new Vector(0,0));
  const [barriers, setBarriers] = useState<ViewportBarriers>(generateViewport(window.innerWidth, window.innerHeight));
  const [barrierX, setBarrierX] = useState<number>(0);
  const [stopMeasuring, setStop] = useState<boolean>(false);
  
  const bRef1 = useRef<SVGSVGElement>(null);
  const bRef2 = useRef<SVGSVGElement>(null);
  const bRef3 = useRef<SVGSVGElement>(null);
  const bRef4 = useRef<SVGSVGElement>(null);

  const collisionDetector = useRef<Collisions | null>(null);

  useEffect(() =>
  {
    let set = 0;
    function animationLoop()
    {
      if(bRef4 && bRef4.current && bRef4.current.getBoundingClientRect())
      {
        setBarrierX(bRef4.current.getBoundingClientRect().left);
      }
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
      }
    }
    requestAnimationFrame(animationLoop) // enables collision checking
  })

  useEffect(() => {
    if (rect1.current !== null && bRef1 !== null && bRef2 !== null && bRef3 !== null
      && bRef4 !== null) {
        collisionDetector.current = new Collisions({references: [rect1, bRef1, bRef2, bRef3, bRef4]});
    }
  }, [rect1, bRef1, bRef2, bRef3, bRef4]);

  useEffect(() =>
  {
    if(collidedElements !== undefined && collidedElements.size > 0)
    {
      const newVectors: Array<Array<Vector>> | undefined = collisionDetector.current?.calculateVectorsWithCollisions(collidedElements);
      if (newVectors !== undefined)
      {
        setVectorState(newVectors[0][0]);
      }
    }
  }, [collidedElements])

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().left);

    function handleResize()
    {
      setBarriers(generateViewport(window.innerWidth, window.innerHeight));
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);

    setVectorState(new Vector(window.innerWidth*2, 0));
    function measureRect()
    {
      if(rect1.current)
      {
        setTerminalBox1X(rect1.current.getBoundingClientRect().left);
      }
      setStop(true);
    }
    setTimeout(measureRect, 1500);
  }, [])

  return (
    <>
      <StaticCollidable barrierProps={barriers.top} ref={bRef1} />
      <StaticCollidable barrierProps={barriers.bottom} ref={bRef2} />
      <StaticCollidable barrierProps={barriers.left} ref={bRef3} />
      <StaticCollidable barrierProps={barriers.right} ref={bRef4} />
      <AnimatedRect ref={rect1} velocityVector={vectorState} 
      moreProps={
        {
          "data-testid": "Box-1",
        }
      }
      />
      <p data-testid="initial-Box-1-x">
        {initialBox1X}
      </p>
      <p data-testid="terminal-Box-1-x">
        {terminalBox1X}
      </p>
      <p data-testid="result-Box-1-x">
        {terminalBox1X - initialBox1X}
      </p>
      <p data-testid="collision-counter">
        {collisionCount}
      </p>
      <p data-testid="right-Barrier">
        {barrierX}
      </p>
    </>
  )
}

export default Test2