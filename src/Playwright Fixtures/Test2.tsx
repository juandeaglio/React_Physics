import { useState, useRef, useEffect } from 'react';
import { AnimatedRect, Vector } from '../Components/AnimatedRect';
import { useWindowAsCollisionBarriers, ViewportBarriers } from '../ViewportBarriers';
import { StaticCollidable } from '../Components/StaticCollidable';



function Test2() 
{
  const rect1 = useRef<SVGRectElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [vectorState, setVectorState] = useState<Vector>({x: 0, y:0});
  const [barriers, setBarriers] = useState<ViewportBarriers>();

  useWindowAsCollisionBarriers(barriers, setBarriers);

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().right);
  }, [rect1])

  useEffect(() =>
  {
    setVectorState({x: Math.sqrt(100/2), y: Math.sqrt(100/2) });
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
          <StaticCollidable barrierProps={barriers.top}></StaticCollidable>
          <StaticCollidable barrierProps={barriers.bottom}></StaticCollidable>
          <StaticCollidable barrierProps={barriers.left}></StaticCollidable>
          <StaticCollidable barrierProps={barriers.right}></StaticCollidable>
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
      </div>
    </>
  )
}

export default Test2