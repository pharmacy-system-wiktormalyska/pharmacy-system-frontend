import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Main, HeaderText, Sidebar, Logo, TabButton, AccountSection, AccountName, LogoutButton } from "../values/components.ts";
import {useEffect} from "react";
import {useAuth} from "../api/AuthContext.tsx"
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const {user, logout} = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    })

    return (
        <>
            <Main>
                <HeaderText style={{ color: "white"}}>Example Dashboard</HeaderText>
            </Main>

            <Sidebar>
                <Logo/>
                <TabButton>Tab 1</TabButton>
                <TabButton>Tab 2</TabButton>
                <TabButton>Tab 3</TabButton>
                <AccountSection>
                    <AccountName>{user?.firstName}</AccountName>
                    <AccountName>{user?.lastName}</AccountName>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

                </AccountSection>
            </Sidebar>
        </>
    );
};