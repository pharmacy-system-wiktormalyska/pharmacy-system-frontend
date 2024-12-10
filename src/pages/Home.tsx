import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerPanel from "./dashboards/OwnerPanel.tsx";
import WarehousePanel from "./dashboards/WarehousePanel.tsx";
import DepartmentPanel from "./dashboards/DepartmentPanel.tsx";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import SidebarComponent from "../components/SidebarComponent.tsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PrescriptionPanel from "./dashboards/PrescriptionPanel.tsx";
import {useAuth} from "../auth/AuthContext.tsx";
import {useJwt} from "react-jwt";
import Cookies from "universal-cookie";
export const MainPage = () => {
    const [name] = useState('');
    const [surName] = useState('');
    const {setStoredDecodedToken, token, storedDecodedToken} = useAuth()
    const {decodedToken} = useJwt(token as string)
    const navigate = useNavigate()


    useEffect(() => {
        const cookies = new Cookies(null, {path: '/'})
        if (cookies.get('token') == undefined) {
            console.log('dupa')
        }

        if (cookies.get('token') == undefined) {
            navigate("/login")
            return
        }
        setStoredDecodedToken(decodedToken as string)
        // console.log(storedDecodedToken)
    }, [navigate, setStoredDecodedToken, decodedToken, storedDecodedToken]);
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

