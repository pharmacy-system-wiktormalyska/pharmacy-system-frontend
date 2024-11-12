import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Main, Sidebar, Logo, TabButton, AccountSection, AccountName, LogoutButton } from "../values/components.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../api/AuthContext.tsx"
import {useNavigate} from "react-router-dom";
import MainPanel from "./dashboards/MainPanel.tsx";
import WarehousePanel from "./dashboards/WarehousePanel.tsx";
import DepartmentPanel from "./dashboards/DepartmentPanel.tsx";

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