

import { createBrowserRouter, Navigate } from "react-router-dom";

import { LoginPage } from '../Core/Auth/Routes/LoginPage';
import { NotFoundPage } from "../Components/UI/NotFoundPage";
import TradePage from "@/Core/Trading/Routes/TradePage";


export const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/trade",
        element: <TradePage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]);