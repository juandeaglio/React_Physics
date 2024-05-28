import React, { useState, useRef, useEffect } from 'react';
import { AnimatedRect, Vector } from '../../src/Components/AnimatedRect';
import { generateViewport, ViewportBarriers } from '../../src/ViewportBarriers';
import { StaticCollidable } from '../../src/Components/StaticCollidable';
import { Collisions } from '../../src/Collisions';


function Test2() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [vectorState, setVectorState] = useState<Vector>({x: 0, y:0});
  const [barriers, setBarriers] = useState<ViewportBarriers>();
  const [barrierX, setBarrierX] = useState<number>(0);
  const [stopMeasuring, setStop] = useState<boolean>(false);
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
    let set = 0;
    function animationLoop()
    {
      
      if(barrierRefs[3].current && barrierRefs[3].current.getBoundingClientRect())
      {
        setBarrierX(barrierRefs[3].current.getBoundingClientRect().left);
      }
      if(!stopMeasuring)
      {
        collisionDetector.checkTrackedForCollisions()
        if(set != collisionDetector.totalCollisions)
        {
          set = collisionDetector.totalCollisions;
          setCollisionCount(collisionDetector.totalCollisions);
        }
        requestAnimationFrame(animationLoop);
      }
    }
    requestAnimationFrame(animationLoop) // enables collision checking
  })

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().right);

    function handleResize()
    {
      setBarriers(generateViewport(window.innerWidth, window.innerHeight));
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);

    setVectorState({x: screen.width*2, y: 0 });
    function measureRect()
    {
      setTerminalBox1X(rect1.current!.getBoundingClientRect().right);
      setStop(true);
    }
    setTimeout(measureRect, 1000);

  }, [])
  useEffect(() =>
  {
    console.log("Resizing with dimensions: ", window.innerHeight, window.innerWidth )
    console.log(barrierRefs[3].current!.getBoundingClientRect().left);
  }, [barriers, barrierRefs])
  return (
    <>
      <StaticCollidable barrierProps={barriers?.top} ref={barrierRefs[0]} />
      <StaticCollidable barrierProps={barriers?.bottom} ref={barrierRefs[1]} />
      <StaticCollidable barrierProps={barriers?.left} ref={barrierRefs[2]} />
      <StaticCollidable barrierProps={barriers?.right} ref={barrierRefs[3]} />
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
        <p data-testid="right-Barrier">
          {barrierX}
        </p>
      </div>
    </>
  )
}

export default Test2