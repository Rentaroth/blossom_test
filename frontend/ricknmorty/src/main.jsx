import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./components/Home.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store/index.jsx";
import { Provider } from "react-redux";
import { Card } from "./components/Card.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/card',
    element: <Card />
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
