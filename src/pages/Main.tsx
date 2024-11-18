import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {useAuth} from "../api/AuthContext.tsx"
import {useNavigate} from "react-router-dom";
import MainPanel from "./dashboards/MainPanel.tsx";
import WarehousePanel from "./dashboards/WarehousePanel.tsx";
import DepartmentPanel from "./dashboards/DepartmentPanel.tsx";
import styled from "styled-components";
import {COLORS} from "../values/colors.ts";

export const MainPage = () => {
    const {user, logout, loginByToken} = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await loginByToken(token)
            } else {
                navigate('/login')
            }
        }
        initializeUser()
    }, [navigate, user, loginByToken])

    const [currentDashboard, setCurrentDashboard] = useState<string>('MainPanel')

    const switchDashboard = (dashboard: string) => {
        setCurrentDashboard(dashboard)
    }

    return (
        <>
            <Main>
                {currentDashboard === 'MainPanel' && <MainPanel />}
                {currentDashboard === 'WarehousePanel' && <WarehousePanel />}
                {currentDashboard === 'DepartmentPanel' && <DepartmentPanel />}
            </Main>

            <Sidebar>
                <Logo/>
                <TabButton onClick={() => switchDashboard('MainPanel')}>Main Panel</TabButton>
                <TabButton onClick={() => switchDashboard('WarehousePanel')}>Warehouse Panel</TabButton>
                <TabButton onClick={() => switchDashboard('DepartmentPanel')}>Department Panel</TabButton>
                <AccountSection>
                    <AccountName>{user?.firstName}</AccountName>
                    <AccountName>{user?.lastName}</AccountName>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

                </AccountSection>
            </Sidebar>
        </>
    );
};

export const Main = styled.div`
    padding-left: 290px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.background};
`;

export const Sidebar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('/src/assets/images/waves-blur.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
`;

export const Logo = styled.div`
    width: 90px;
    height: 90px;
    background-image: url('/src/assets/images/flask.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: invert(1);
    margin-top: 20px;
    margin-bottom: 40px;
`;

export const TabButton = styled.button`
    width: 100%;
    padding: 15px;
    margin: 5px 0;
    color: ${COLORS.text};
    background-color: ${COLORS.button};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-family: "Outfit Medium", serif;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;

export const AccountSection = styled.div`
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: ${COLORS.text};
    gap: 10px;
`;

export const AccountName = styled.div`
    font-size: 18px;
    font-family: "Outfit Regular";
`;

export const LogoutButton = styled.button`
    width: 80%;
    padding: 10px;
    color: ${COLORS.text};
    background-color: ${COLORS.button};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-family: "Outfit Medium", serif;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;