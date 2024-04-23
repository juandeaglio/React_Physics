import { useState } from 'react'
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
        <button onClick={() => {}}> {/* fill me in */}
          Toggle Animation State
        </button>
        <button onClick={() => {}}> {/* fill me in */}
          New Box Destination
        </button>
        <svg style={{'width': '100%','border': '1px solid black'}}>
          <Rect className='animated-element'>
          </Rect>
        </svg>
        <style />
        
        <p>X: {0}</p>  {/* fill me in */}
        <p>Y: {0}</p>{/* fill me in */}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
