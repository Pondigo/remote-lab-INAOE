import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18n";


import "rsuite/dist/rsuite.min.css";

import "tailwindcss/tailwind.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RequireAuth from './Auth/requireAuth';
import Auth from './Auth';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<RequireAuth>
      <App />
    </RequireAuth>}>

    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  //Add class to root element
);

document
  .getElementById("root")
  ?.classList.add(
    "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))]", "from-gray-100", "to-gray-300", "h-screen", "w-screen"
  );


root.render(
  <React.StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
