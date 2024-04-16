import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled, {keyframes} from 'styled-components';

const moveRectAnimation = (startX: number, startY: number) => keyframes`
  from {
    transform: translate(${startX}px, ${startY}px);
  }
  to {
    transform: translate(${startX + 100}px, ${startY + 100}px);
  }
`
const Rect = styled.rect<{ boxPause: boolean; currentX: number; currentY: number; animateRect: boolean; animationStartX: number; animationStartY: number }>`
  fill: red;
  width: 100px;
  height: 100px;
  animation-play-state: ${props => props.boxPause ? 'paused' : 'running'};
  x: ${props => props.currentX};
  y: ${props => props.currentY};
  animation: ${props => props.animateRect ? moveRectAnimation(props.animationStartX, props.animationStartY) : 'none'} 1s linear;
  animation-fill-mode: forwards;
`;

function App() 
{
  const [count, setCount] = useState<number>(0)
  const [currentX, setX] = useState<number>(0);
  const [currentY, setY] = useState<number>(0);
  const [animationStartX, setStartX] = useState<number>(0);
  const [animationStartY, setStartY] = useState<number>(0);
  const [boxPause, setBoxPause] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);




  useEffect(() => {
    setX(10)
    setY(10)
    setStartX(currentX)
    setStartY(currentY)
    setAnimation(true)
  }, []);
  
  const invertBoxPauseState = () =>
  {
    setBoxPause(!boxPause)
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
        <button onClick={() => invertBoxPauseState()}>
          Toggle Animation State
        </button>
        <button onClick={() => {setStartX(animationStartX); setStartY(animationStartY)}}>
          New Box Destination
        </button>
        <svg>
         <Rect 
              boxPause={boxPause}
              currentX={currentX}
              currentY={currentY}
              animationStartX={animationStartX}
              animationStartY={animationStartY}
              animateRect={animation}
          />
        </svg>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
