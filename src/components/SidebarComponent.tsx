import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import colorPalette from "../values/colors.ts";
import {rolesGetter} from "../values/RolesGetter.tsx";
import React from "react";
import {useAuth} from "../auth/AuthContext.tsx";

interface SidebarProps {
    name: string;
    authorities: string[];
}

const SidebarComponent: React.FC<SidebarProps> = ({name, authorities}) => {
    const navigate = useNavigate()
    const {logout} = useAuth()
    // const [selectedRole, setSelectedRole] = useState<number>(0);
    //
    // const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedRole(Number(event.target.value));
    // };



    const hasAccess = (authority: string): boolean => {
        for (const role of rolesGetter) {
            if (authorities.includes(role.name)) {
                if (role.allowedPanels.includes(authority) || role.allowedPanels.includes("*")) {
                    return true;
                }
            }
        }
        return false
    }

    return (
        <Sidebar>
            <Logo />
            {/*TODO: setAccess*/}
            {hasAccess("*") && <TabButton onClick={() => navigate("store")}>Store</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("prescription")}>Prescriptions</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("warehouse")}>Warehouse</TabButton>}
            {/*{role && roleHasAccess(role, "department") && <TabButton onClick={() => navigate("/department")}>Department</TabButton>}*/}
            {hasAccess("*") && <TabButton onClick={() => navigate("admin/drug_order")}>Admin Drug Order Panel</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("admin/manager")}>Admin Manager Panel</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("admin/drug")}>Admin Drug Panel</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("admin/pharmacy")}>Admin Pharmacy Panel</TabButton>}
            {hasAccess("*") && <TabButton onClick={() => navigate("admin/pharmacist")}>Admin Pharmacist Panel</TabButton>}
            {/*<RoleSelector value={selectedRole} onChange={handleRoleChange}>*/}
            {/*    {rolesGetter.map(role => (*/}
            {/*        <option key={role.id} value={role.id}>{role.name}</option>*/}
            {/*    ))}*/}
            {/*</RoleSelector>*/}

            <AccountSection>
                <AccountName>{name}</AccountName>
                <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
            </AccountSection>

        </Sidebar>
    )
}

export default SidebarComponent
//
// const RoleSelector = styled.select`
//     color: black;
//     background-color: white;
// `

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