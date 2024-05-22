
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Test1 from './Playwright Fixtures/Test1';
import Test2 from './Playwright Fixtures/Test2';


function App() {
  const router = createBrowserRouter([
    {
      path: "/1",
      element: <Test1 />,
    },
    {
      path: "/2",
      element: <Test2 />,
    },
  ]);

  return(
      <RouterProvider router={router} />
  );

}

export default App;
