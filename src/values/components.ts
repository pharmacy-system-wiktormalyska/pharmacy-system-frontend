import styled from "styled-components";
import {COLORS} from "./colors.ts";

//////////////////////
// Auth components
//////////////////////
export const AuthMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: url('/src/assets/images/waves-bg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const HeaderText = styled.div`
    color: ${COLORS.darkText};
    padding: 20px 0 50px 0;
    font-size: 25px;
    font-family: "Outfit Medium";
`;

export const Credentials = styled.form`
    display: flex;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.windowBackground};
    padding: 25px;
    border-radius: 20px;
`;

export const SpanCredentials = styled.span`
    background-color: ${COLORS.button};
    color: ${COLORS.text};
    border-width: 0;
    height: 45px;
    border-right-width: 5px;
    border-color: ${COLORS.windowBackground};
`;

export const InputCredentials = styled.input`
    background-color: ${COLORS.inputBox};
    border-width: 0;
    font-family: "Outfit Regular", serif;
`;

export const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Submit = styled.button`
    background-color: ${COLORS.button};
    width: 100%;
    height: 45px;
    margin-top: 25px;
    margin-bottom: 25px;
    font-family: "Outfit Medium", serif;
    border-width: 0;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;


//////////////////////
// Main components
//////////////////////
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