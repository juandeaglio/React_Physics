import { useState, useRef, useEffect } from 'react';
import { AnimatedRect } from '../../src/Components/AnimatedRect';
import { Vector } from '../../src/Components/Vector';

function Test3() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const [Box1X, setBox1X] = useState<number>(0);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [vectorState, setVectorState] = useState<Vector>(new Vector(0,0));
  const [stopMeasuring, setStop] = useState<boolean>(false);

  useEffect(() =>
  {
    function animationLoop()
    {
      setBox1X(rect1.current!.getBoundingClientRect().left);

      if (Box1X != 0 && Box1X - initialBox1X >= 40)
      {
        setStop(true);
        setVectorState(new Vector(0,0));
      }
      if (!stopMeasuring)
      {
        requestAnimationFrame(animationLoop)
      }
    }
    requestAnimationFrame(animationLoop) // enables collision checking
  })

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().left);
    setVectorState(new Vector(10, 0));
  }, [])

  return (
    <>
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
      <p data-testid="Box-1-x">
        {Box1X}
      </p>
    </>
  )
}

export default Test3