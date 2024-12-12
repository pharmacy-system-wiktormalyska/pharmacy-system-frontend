import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerPanel from "./panels/OwnerPanel.tsx";
import WarehousePanel from "./panels/WarehousePanel.tsx";
import DepartmentPanel from "./panels/DepartmentPanel.tsx";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import SidebarComponent from "../components/SidebarComponent.tsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PrescriptionPanel from "./panels/PrescriptionPanel.tsx";
import {DecodedTokenType, useAuth} from "../auth/AuthContext.tsx";
import {useJwt} from "react-jwt";
import Cookies from "universal-cookie";
import {DrugOrderPanel} from "./panels/DrugOrderPanel.tsx";
export const MainPage = () => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const {setStoredDecodedToken, token, storedDecodedToken, setToken} = useAuth()
    const {decodedToken} = useJwt<DecodedTokenType>(token as string)
    const navigate = useNavigate()


    useEffect(() => {
        const cookies = new Cookies(null, {path: '/'})
        const tokenFromCookies = cookies.get('token');

        if (tokenFromCookies == undefined) {
            navigate("/login")
            return
        }
        setToken(tokenFromCookies)

        if (decodedToken) {
            setStoredDecodedToken(decodedToken)
            setUsername(decodedToken.sub)
        }
    }, [navigate, setStoredDecodedToken, decodedToken, storedDecodedToken, setToken]);


// Router configuration to define if login or anything else
    return (
        <Master >
            <SidebarComponent userName={username}/>
            <SwappableComponent>
                    <Routes>
                        <Route path="*" element={<OwnerPanel/>}/>
                        <Route path="/prescription" element={<PrescriptionPanel/>}/>
                        <Route path="/warehouse" element={<WarehousePanel/>}/>
                        <Route path="/department" element={<DepartmentPanel/>}/>
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

