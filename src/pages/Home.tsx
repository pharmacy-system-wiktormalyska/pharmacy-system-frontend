import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WarehousePanel from "./panels/WarehousePanel.tsx";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import SidebarComponent from "../components/SidebarComponent.tsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import PrescriptionPanel from "./panels/PrescriptionPanel.tsx";
import {StorePanel} from "./panels/StorePanel.tsx";
import {DrugOrderPanel} from "./panels/admin/DrugOrderPanelComponents/DrugOrderPanel.tsx";
import {useAuth} from "../auth/AuthContext.tsx";
import {ManagerPanel} from "./panels/admin/ManagerPanelComponents/ManagerPanel.tsx";
import {DrugPanel} from "./panels/admin/DrugPanelComponents/DrugPanel.tsx";
import {PharmacyPanel} from "./panels/admin/PharmacyPanelComponents/PharmacyPanel.tsx";
import {PharmacistPanel} from "./panels/admin/PharmacistPanelComponents/PharmacistPanel.tsx";

export const MainPage = () => {
    const [name, setName] = useState('')
    const [roles, setRoles] = useState<string[]>([])
    const {storedDecodedToken} = useAuth()
    useEffect(() => {
        setName(storedDecodedToken?.name || "")
        setRoles(storedDecodedToken?.authorities || [""])
    }, [storedDecodedToken?.authorities, storedDecodedToken?.name]);

// Router configuration to define if login or anything else
    return (
        <Master >
            <SidebarComponent name={name} authorities={roles}/>
            <SwappableComponent>
                    <Routes>
                        <Route path="/prescription" element={<PrescriptionPanel/>}/>
                        <Route path="/warehouse" element={<WarehousePanel/>}/>
                        <Route path="/store" element={<StorePanel/>}/>
                        <Route path="/admin/drug_order" element={<DrugOrderPanel/>}/>
                        <Route path="/admin/manager" element={<ManagerPanel/>}/>
                        <Route path="/admin/drug" element={<DrugPanel/>}/>
                        <Route path="/admin/pharmacy" element={<PharmacyPanel/>}/>
                        <Route path="/admin/pharmacist" element={<PharmacistPanel/>}/>
                    </Routes>
            </SwappableComponent>
        </Master>
    );
};
export const Master = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export const SwappableComponent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: ${colorPalette.background.hex};
`;

