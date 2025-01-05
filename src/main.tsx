import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from "./auth/AuthContext.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import AuthRouter from "./routers/AuthRouter.tsx";

// Router configuration to define if login or anything else



createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <Router>
            <AuthRouter />
        </Router>
    </AuthProvider>
);
