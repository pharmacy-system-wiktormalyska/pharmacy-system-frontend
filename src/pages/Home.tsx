import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerPanel from "./dashboards/OwnerPanel.tsx";
import WarehousePanel from "./dashboards/WarehousePanel.tsx";
import DepartmentPanel from "./dashboards/DepartmentPanel.tsx";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import SidebarComponent from "../components/SidebarComponent.tsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import PrescriptionPanel from "./dashboards/PrescriptionPanel.tsx";
export const MainPage = () => {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    useEffect(() => {
        (
            async () => {
                 const response = await fetch('https://backend.pharmacy.wiktormalyska.ovh/api/user', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })
                const content = await response.json()
                setName(content.name)
                setSurName(content.surname)
            }
        )()
    }, []);

// Router configuration to define if login or anything else
    return (
        <Master >
            <SidebarComponent firstName={name} secondName={surName}/>
            <SwappableComponent>
                    <Routes>
                        <Route path="*" element={<OwnerPanel/>}/>
                        <Route path="/prescription" element={<PrescriptionPanel/>}/>
                        <Route path="/warehouse" element={<WarehousePanel/>}/>
                        <Route path="/department" element={<DepartmentPanel/>}/>
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

