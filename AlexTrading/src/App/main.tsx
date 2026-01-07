
import React from 'react';
import ReactDOM from 'react-dom/client';

// import 'bootstrap/dist/css/bootstrap.min.css'


import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './router';
import '../Styles/Index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={browserRouter} />
    </React.StrictMode>
);