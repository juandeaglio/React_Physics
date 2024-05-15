import { useState, useEffect, useRef, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components';

const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;

function App() 
{
  const [count, setCount] = useState<number>(0);
  const [boxX, setBoxX] = useState<number>(0);
  const [boxY, setBoxY] = useState<number>(0);
  const [boxXLoaded, setBoxXLoaded] = useState<boolean>(false);
  //const [animY, setAnimY] = useState<number>(0);
  const animationRef = useRef<number>();
  const boxXRef = useRef<number>();
  const boxRef = useRef<SVGRectElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const boxAnimRef = useRef<Animation | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  

  useEffect(() => {
    getBoxCoordinates();
    setBoxXLoaded(true);

    // recursive loop
    const getAnimation = () => {
      getBoxCoordinates();
      animationRef.current = requestAnimationFrame(getAnimation);
    };


    // Start the animation loop
    animationRef.current = requestAnimationFrame(getAnimation);

    // Clean up the animation loop on component unmount
    return () => {
      cancelAnimationFrame(animationRef.current as number);
    };
  }, []); // Empty dependency array to run the effect only once

  const newAnimation = useCallback(() => {    
    const svgX = svgRef.current!.getBoundingClientRect().left;
    const relativePos = boxXRef.current! - svgX;
    console.log(`boxX: ${relativePos}, svgX: ${svgX}`)

    if (boxAnimRef.current)
    {
      boxAnimRef.current!.cancel();
    }

    boxAnimRef.current = boxRef.current!.animate([
      {
        transform: `translateX(${relativePos}px)`
      },
      {
        transform: `translateX(${relativePos+ 200}px)`
      }
    ], { duration: 1000, fill: 'forwards', iterations: 1 });
    console.log(`Starting animation from: ${relativePos}`);
    return boxAnimRef.current;
  }, []);
  useEffect(() => 
  {
    console.log("Current boxX: ", boxX);
    boxXRef.current = boxX;
  }, [boxX]);

  useEffect(() => 
  {
    if (boxRef.current && boxXLoaded) {
      boxRef.current.style.animationPlayState = 'running';

      console.log(`Starting animation from: ${boxX}`);


      boxAnimRef.current = newAnimation();
      boxAnimRef.current.onfinish = () =>
      { 
        newAnimation();
      };
    }
  }, [boxXLoaded])


  function toggleAnimationPlayState() {
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

  function getBoxCoordinates() {
    const elementRect = boxRef.current!.getBoundingClientRect();
    setBoxX(elementRect.left);
    setBoxY(elementRect.top);
    return elementRect;
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
        <button onClick={() => toggleAnimationPlayState()}>
          Toggle Animation State
        </button>
        <button onClick={() => newAnimation()}>
          New Box Destination
        </button>
        <svg style={{'width': '100%','border': '1px solid black'}} ref={svgRef}>
          <Rect className='animated-element' ref={boxRef}>
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
