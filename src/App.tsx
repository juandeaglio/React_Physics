import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AnimatedRect, Vector } from './AnimatedRect';


function App() 
{
  const [count, setCount] = useState<number>(0);
  const rect1 = useRef<SVGRectElement>(null);
  const [initialBox1X, setInitialBox1X] = useState<number>(0);
  const [terminalBox1X, setTerminalBox1X] = useState<number>(0);
  const [transitionState, setTransitionState] = useState<string>();
  const [vectorState, setVectorState] = useState<Vector>({x: 0, y:0});

  useEffect(() =>
  {
    setInitialBox1X(rect1.current!.getBoundingClientRect().right);
  }, [rect1])

  useEffect(() =>
  {
    setVectorState({x: Math.sqrt(100/2), y: Math.sqrt(100/2) });
    setTransitionState("transform 1s linear 0s");
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          # of elements: 1
        </p>
        <button onClick={() => {}}> {/* fill me in */}
          Toggle Animation State
        </button>
        <button onClick={() => {}}> {/* fill me in */}
          New Box Destination
        </button>
        <AnimatedRect 
        ref={rect1} 
        velocityVector={vectorState} 
        moreProps={
          {
            "data-testid": "Box-1",
            transition: transitionState
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
