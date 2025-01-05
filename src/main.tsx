import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider as Router} from 'react-router-dom'
import {MainPage} from "./pages/Home.tsx"
import AuthPage from "./pages/Auth.tsx"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {AuthProvider} from "./auth/AuthContext.tsx";
// Router configuration to define if login or anything else
export const router = createBrowserRouter([
    {
        path: '*',
        element: <MainPage />,
    },
    {
        path: '/login',
        element: <AuthPage />,
    }
]);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
        <AuthProvider>
            <Router router={router} />
        </AuthProvider>
    // </StrictMode>
)
