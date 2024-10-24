import styled from "styled-components";
import {COLORS} from "./colors.ts";

export const Main = styled.div`
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
    font-weight: 700;
    font-family: "Outfit Bold";
`;

export const Credentials = styled.div`
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
    font-weight: 500;
    border-width: 0;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;