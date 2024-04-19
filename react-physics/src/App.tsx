import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [count, setCount] = useState<number>(0);
  const [boxX, setBoxX] = useState<number>(0);
  const [boxY, setBoxY] = useState<number>(0);
  const [animX, setAnimX] = useState<number>(0);
  //const [animY, setAnimY] = useState<number>(0);
  const animationRef = useRef<number>();
  const boxRef = useRef<SVGRectElement | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const createAnimation = useCallback(() => {
    // wat do we do with this.
    if(boxRef.current && boxRef.current.style.animation != 'none')
    {
      boxRef.current.style.animation = 'move 2s linear forwards';
    }
    
    if (styleRef.current && styleRef.current.sheet)
    {
      styleRef.current.sheet?.cssRules.length > 0 ? styleRef.current.sheet?.deleteRule(0) : null;
      styleRef.current.sheet?.insertRule(`
          @keyframes move {
            0% {
                transform: translateX(${animX}px);
            }
            100% {
              transform: translateX(${animX + 200}px);
            }
          }`, 0);
    }
  }, [animX]);
  

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.animationPlayState = 'running';
      getBoxCoordinates();
      setBoxAnimEndState(boxX);
    }

    const animate = () => {
      getBoxCoordinates();
      // recursive loop
      animationRef.current = requestAnimationFrame(animate);
    };


    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Clean up the animation loop on component unmount
    return () => {
      cancelAnimationFrame(animationRef.current as number);
    };
  }, []); // Empty dependency array to run the effect only once

  function setBoxAnimEndState(x: number)
  {    
    if (boxRef.current) {
      setAnimX(x);
    }
  }
  function invertState() {
    if (boxRef.current) {
      if (boxRef.current.style.animationPlayState == 'running')
      {
        boxRef.current.style.animationPlayState = 'paused';
      }
      else
      {
        boxRef.current.style.animationPlayState = 'running'
      }
    }
  }
  
  useEffect(() => {
    createAnimation()
  }, [createAnimation]);

  function getBoxCoordinates() {
    if (boxRef.current) {
      const elementRect = boxRef.current.getBoundingClientRect();
      setBoxX(elementRect.left);
      setBoxY(elementRect.top);
    }
  }
  

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
        <button onClick={() => invertState()}>
          Toggle Animation State
        </button>
        <button onClick={() => setBoxAnimEndState(boxX)}>
          New Box Destination
        </button>
        <svg width='full'>
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
