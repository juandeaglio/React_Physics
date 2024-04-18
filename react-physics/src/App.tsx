import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components';

const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
`;

function App() 
{
  const [count, setCount] = useState<number>(0)
  const [boxX, setBoxX] = useState<number>(0)
  const [boxY, setBoxY] = useState<number>(0)
  const animationRef = useRef<number>();
  const boxRef = useRef<SVGRectElement | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const animate = () => {
      // Your code to be executed on each animation frame
      // For example, you can update the component's state or perform any other operations

      // Schedule the next animation frame
      if(boxRef.current)
      {
        const elementRect = boxRef.current.getBoundingClientRect();
        setBoxX(elementRect.left);
        setBoxY(elementRect.top);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    if (boxRef.current && styleRef.current) {
      boxRef.current.style.animation = 'move 2s linear infinite';
      // You can also modify the keyframes or transform properties directly
        styleRef.current.sheet?.insertRule(`
         @keyframes move {
           0% {
                transform: translateX(0);
            }
            50% {
              transform: translateX(200px);
            }
            100% {
              transform: translateX(0);
            }
          }`
          , 0);
    }
    animationRef.current = requestAnimationFrame(animate);

    // Clean up the animation loop on component unmount
    return () => {
      cancelAnimationFrame(animationRef.current as number);
    };
  }, [boxRef]); // Empty dependency array to run the effect only once




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
        <button >
          Toggle Animation State
        </button>
        <button >
          New Box Destination
        </button>
        <svg>
          <Rect ref={boxRef}>
          </Rect>
        </svg>
        <style ref={styleRef} />
        
        <p>X: {boxX}</p>
        <p>Y: {boxY}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
