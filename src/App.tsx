
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test1 from '../test/Playwright Fixtures/Test1';
import Test2 from '../test/Playwright Fixtures/Test2';
import Test3 from '../test/Playwright Fixtures/Test3';
import Test4 from '../test/Playwright Fixtures/Test4';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "1",
          element: <Test1 />,
        },
        {
          path: "2",
          element: <Test2 />,
        },
        {
          path: "3",
          element: <Test3 />,
        },
        {
          path: "4",
          element: <Test4 />,
        },
      ],
    },
  ]);

  return(
      <RouterProvider router={router} />
  );

}

export default App;
