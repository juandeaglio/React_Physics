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
  const animationStartXRef = useRef<number>(0);
  const animationStartYRef = useRef<number>(0);
  const [animationBegin, setAnimationBegin] = useState<string>('indefinite');




  useEffect(() => {
    setAnimationBegin('indefinite');
  }, []);
  
  const toggleAnimation = () => {
    setAnimationBegin(prevState => prevState === 'indefinite' ? '0s' : 'indefinite');
  };

  const setNewDestination = () => {
    animationStartXRef.current += 100;
    setAnimationBegin('indefinite');
  };

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
        <button onClick={() => toggleAnimation()}>
          Toggle Animation State
        </button>
        <button onClick={() => {setNewDestination()}}>
          New Box Destination
        </button>
        <svg>
         <Rect>
            <animate
              attributeName="x"
              from={animationStartXRef.current}
              to={animationStartXRef.current + 100}
              dur="1s"
              begin={animationBegin}
              fill="freeze"
            />
            <animate
              attributeName="y"
              from={animationStartYRef.current}
              to={animationStartYRef.current}
              dur="1s"
              begin={animationBegin}
              fill="freeze"
            />
          </Rect>

        </svg>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
