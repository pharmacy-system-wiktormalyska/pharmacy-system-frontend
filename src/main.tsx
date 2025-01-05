import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from "./auth/AuthContext.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import AuthRouter from "./routers/AuthRouter.tsx";
import {Popover} from "./components/popover/Popover.tsx";
import {PopoverProvider} from "./components/popover/PopoverContext.tsx";

// Router configuration to define if login or anything else



createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <Router>
            <PopoverProvider>
                <Popover />
                <AuthRouter />
            </PopoverProvider>
        </Router>
    </AuthProvider>
);
