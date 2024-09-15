import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Card } from "./components/Card";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: 'card',
        element: <Card />
      },
    ],
  },
])

export { router }