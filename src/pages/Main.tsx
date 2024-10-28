import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Main, HeaderText, Sidebar, Logo, TabButton, AccountSection, AccountName, LogoutButton } from "../values/components.ts";

export const MainPage = () => {
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
                    <AccountName>example@mail.com</AccountName>
                    <LogoutButton>Logout</LogoutButton>
                </AccountSection>
            </Sidebar>
        </>
    );
};