import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';
import AuthPage from '../pages/AuthPage.tsx';
import {MainPage} from '../pages/Home.tsx';
import OwnerPanel from "../pages/panels/OwnerPanel.tsx";
import PrescriptionPanel from "../pages/panels/PrescriptionPanel.tsx";
import WarehousePanel from "../pages/panels/WarehousePanel.tsx";
import StorePanel from "../pages/panels/StorePanel.tsx";
import {DrugOrderPanel} from "../pages/panels/DrugOrderPanel.tsx";

const AuthRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/"
                   element={isAuthenticated ? <Navigate to="/dashboard/store" /> : <AuthPage />}/>
            <Route path="/login"
                   element={isAuthenticated ? <Navigate to="/dashboard/store" /> : <AuthPage />}/>
            <Route
                path="/dashboard"
                element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
            >

                {/* Zagnieżdżone ścieżki pod /dashboard */}
                <Route path="owner" element={<OwnerPanel />} />
                <Route path="prescription" element={<PrescriptionPanel />} />
                <Route path="warehouse" element={<WarehousePanel />} />
                <Route path="store" element={<StorePanel />} />
                <Route path="drug_order" element={<DrugOrderPanel />} />
            </Route>
        </Routes>
    );
};

export default AuthRouter;
