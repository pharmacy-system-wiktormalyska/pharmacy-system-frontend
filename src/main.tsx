import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider as Router } from 'react-router-dom';
import {MainPage} from "./pages/Main.tsx";
import AuthPage from "./pages/Auth.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/login',
        element: <AuthPage />,
    }
]);

createRoot(document.getElementById('root')!).render(
     <Router router={router} />
)
