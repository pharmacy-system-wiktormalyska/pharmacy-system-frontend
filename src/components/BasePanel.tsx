import React from 'react';
import styled from "styled-components";
import colorPalette from "../values/colors.ts";

interface BasePanelProps {
    title: string;
    children: React.ReactNode;
    panelKey?: string | number;
}

const BasePanel: React.FC<BasePanelProps> = ({ title, children, panelKey }) => {

    return (
        <>
            <Header>
                <HeaderText key={panelKey} style={{ color: "white" }}>{title}</HeaderText>
            </Header>
            <Background>
                <Columns>
                    {children}
                </Columns>
            </Background>
        </>
    );
}

export default BasePanel;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colorPalette.header.hex};
`

const Header = styled.div`
    display: flex;
    width: calc(100% - 1rem);
    background-color: ${colorPalette.header.hex};
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 1rem 0;
`

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: ${colorPalette.background.hex};
    border-top-left-radius: 1rem;
    flex-wrap: nowrap;
    gap: 1rem;
`;

const HeaderText = styled.div`
    color: ${colorPalette.darkText.hex};
    padding: 1rem 0;
    font-size: 25px;
    font-family: "Outfit Medium", sans-serif;
`;
