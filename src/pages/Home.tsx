import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerPanel from "./panels/OwnerPanel.tsx";
import WarehousePanel from "./panels/WarehousePanel.tsx";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import SidebarComponent from "../components/SidebarComponent.tsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import PrescriptionPanel from "./panels/PrescriptionPanel.tsx";
import StorePanel from "./panels/StorePanel.tsx";
import {DrugOrderPanel} from "./panels/DrugOrderPanel.tsx";
import {useAuth} from "../auth/AuthContext.tsx";

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
                        <Route path="/owner" element={<OwnerPanel/>}/>
                        <Route path="/prescription" element={<PrescriptionPanel/>}/>
                        <Route path="/warehouse" element={<WarehousePanel/>}/>
                        <Route path="/store" element={<StorePanel/>}/>
                        <Route path="/drug_order" element={<DrugOrderPanel/>}/>
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

