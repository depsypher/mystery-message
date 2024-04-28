import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import Solve from "./Solve.tsx";
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/solve",
        element: <Solve />
    },
], {basename: import.meta.env.DEV ? '/' : '/mystery-message/' });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
