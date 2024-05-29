import { useState, useRef, useEffect } from 'react'
import reactLogo from '../../src/assets/react.svg';
import viteLogo from '../../public/vite.svg';
import { AnimatedRect } from '../../src/Components/AnimatedRect';
import { Vector } from '../../src/Components/Vector';
function Test1() 
{
  const rect1 = useRef<SVGSVGElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [vectorState, setVectorState] = useState<Vector>(new Vector(0, 0));

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().right);
  }, [rect1])

  useEffect(() =>
  {
    setVectorState(new Vector(Math.sqrt(100/2), Math.sqrt(100/2)));
    function measureRect()
    {
      setTerminalBox1X(rect1.current!.getBoundingClientRect().right);
    }
    setTimeout(measureRect, 1000);
  }, [initialBox1X])
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
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

export default Test1