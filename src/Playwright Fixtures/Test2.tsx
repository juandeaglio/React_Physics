import React, { useState, useRef, useEffect } from 'react';
import { AnimatedRect, Vector } from '../Components/AnimatedRect';
import { useWindowAsCollisionBarriers, ViewportBarriers } from '../ViewportBarriers';
import { StaticCollidable } from '../Components/StaticCollidable';
import { Collisions } from '../Collisions';


function Test2() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [vectorState, setVectorState] = useState<Vector>({x: 0, y:0});
  const [barriers, setBarriers] = useState<ViewportBarriers>();
  const barrierRefs: React.RefObject<SVGSVGElement>[] = function() {
    const refs = []
    for (let i = 0; i < 4; i++)
    {
      refs.push(React.createRef<SVGSVGElement>());
    }
    return refs;
  }();
  const collisionDetector = new Collisions({references: [rect1].concat(barrierRefs)});

  useEffect(() =>
  {
    function animationLoop()
    {
      collisionDetector.checkTrackedForCollisions()
      setCollisionCount(collisionDetector.totalCollisions);
      console.log(collisionDetector.totalCollisions);
      requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop) // enables collision checking
  })

  useWindowAsCollisionBarriers(barriers, setBarriers);


  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().right);
  }, [rect1])

  useEffect(() =>
  {
    setVectorState({x: 1500, y: 0 });
    function measureRect()
    {
      setTerminalBox1X(rect1.current!.getBoundingClientRect().right);
    }
    setTimeout(measureRect, 1000);
  }, [initialBox1X])
  
  function Barriers(barriers: ViewportBarriers | undefined)
  {
    if (barriers)
    {
      return (
        <>
          <StaticCollidable barrierProps={barriers.top} ref={barrierRefs[0]} />
          <StaticCollidable barrierProps={barriers.bottom} ref={barrierRefs[1]} />
          <StaticCollidable barrierProps={barriers.left} ref={barrierRefs[2]} />
          <StaticCollidable barrierProps={barriers.right} ref={barrierRefs[3]} />
        </>
      )
    }
  }
  
  const boundaryBarriers = Barriers(barriers);
  return (
    <>
      {boundaryBarriers}
      <div className="card">
        <AnimatedRect 
        ref={rect1} 
        velocityVector={vectorState} 
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
      </div>
    </>
  )
}

export default Test2