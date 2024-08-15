import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './page/Home.jsx';
import SignIn from './Component/SignIn.jsx';
import SignUp from './Component/SignUp.jsx';
import Root from './Root.jsx';
import ContextProvider from './Auth/ContextProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
