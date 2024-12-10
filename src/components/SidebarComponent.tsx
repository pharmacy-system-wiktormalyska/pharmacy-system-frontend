import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import colorPalette from "../values/colors.ts";
import {getRoleByID, roleHasAccess, rolesGetter} from "../values/RolesGetter.tsx";
import React, {useState} from "react";
import Cookies from "universal-cookie";

interface SidebarProps {
    userName: string | undefined
}

const SidebarComponent: React.FC<SidebarProps> = ({userName}) => {
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState<number>(rolesGetter[0].id);
    const cookies = new Cookies(null, {path: '/'})

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(Number(event.target.value));
    };

    const logout = async () => {
        cookies.remove("token", {path: "/"})
        navigate('/login')
    }

    const role = getRoleByID(selectedRole);
    return (
        <Sidebar>
            <Logo />
            {role && roleHasAccess(role, "*") && <TabButton onClick={() => navigate("/")}>Owner Panel</TabButton>}
            {role && roleHasAccess(role, "prescription") && <TabButton onClick={() => navigate("/prescription")}>Prescription Panel</TabButton>}
            {role && roleHasAccess(role, "warehouse_edit") && <TabButton onClick={() => navigate("/warehouse")}>Warehouse Panel</TabButton>}
            {role && roleHasAccess(role, "department") && <TabButton onClick={() => navigate("/department")}>Department Panel</TabButton>}

            {/*TODO: Mockowany wybór*/ }
            <RoleSelector value={selectedRole} onChange={handleRoleChange}>
                {rolesGetter.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                ))}
            </RoleSelector>

            <AccountSection>
                <AccountName>{userName}</AccountName>
                <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
            </AccountSection>

        </Sidebar>
    )
}

export default SidebarComponent

const RoleSelector = styled.select`
    color: black;
    background-color: white;
`

export const Sidebar = styled.div`
    height: 100%;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('/src/assets/images/waves-blur.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 10px;
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
    color: ${colorPalette.text.hex};
    background-color: ${colorPalette.button.hex};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-family: "Outfit Medium", serif;
    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
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
    color: ${colorPalette.text.hex};
    gap: 10px;
`;

export const AccountName = styled.div`
    font-size: 18px;
    font-family: "Outfit Regular";
`;

export const LogoutButton = styled.button`
    width: 80%;
    padding: 10px;
    color: ${colorPalette.text.hex};
    background-color: ${colorPalette.button.hex};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-family: "Outfit Medium", serif;
    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
    }
`;