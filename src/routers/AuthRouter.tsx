import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';
import AuthPage from '../pages/AuthPage.tsx';
import {MainPage} from '../pages/Home.tsx';

const AuthRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login"
                   element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}/>
            <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}/>
        </Routes>
    );
};

export default AuthRouter;
