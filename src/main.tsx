import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from "./auth/AuthContext.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import AuthRouter from "./routers/AuthRouter.tsx";
import {Popover} from "./components/popover/Popover.tsx";
import {PopoverProvider} from "./components/popover/PopoverContext.tsx";
import 'react-datepicker/dist/react-datepicker.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
        <AuthProvider>
            <Router>
                <QueryClientProvider client={queryClient}>
                    <PopoverProvider>
                        <Popover />
                        <AuthRouter />
                    </PopoverProvider>
                </QueryClientProvider>
            </Router>
        </AuthProvider>
);
