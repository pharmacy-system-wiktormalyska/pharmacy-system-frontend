import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';
import AuthPage from '../pages/AuthPage.tsx';
import {MainPage} from '../pages/Home.tsx';
import PrescriptionPanel from "../pages/panels/PrescriptionPanel.tsx";
import WarehousePanel from "../pages/panels/WarehousePanel.tsx";
import {StorePanel} from "../pages/panels/StorePanel.tsx";
import {DrugOrderPanel} from "../pages/panels/admin/DrugOrderPanelComponents/DrugOrderPanel.tsx";
import {ManagerPanel} from "../pages/panels/admin/ManagerPanelComponents/ManagerPanel.tsx";
import {DrugPanel} from "../pages/panels/admin/DrugPanelComponents/DrugPanel.tsx";
import {PharmacyPanel} from "../pages/panels/admin/PharmacyPanelComponents/PharmacyPanel.tsx";
import {PharmacistPanel} from "../pages/panels/admin/PharmacistPanelComponents/PharmacistPanel.tsx";

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
                <Route path="prescription" element={<PrescriptionPanel />} />
                <Route path="warehouse" element={<WarehousePanel />} />
                <Route path="store" element={<StorePanel />} />
                <Route path="admin/drug_order" element={<DrugOrderPanel />} />
                <Route path="admin/manager" element={<ManagerPanel/>}/>
                <Route path="admin/drug" element={<DrugPanel/>}/>
                <Route path="admin/pharmacy" element={<PharmacyPanel/>}/>
                <Route path="admin/pharmacist" element={<PharmacistPanel/>}/>
            </Route>
        </Routes>
    );
};

export default AuthRouter;
