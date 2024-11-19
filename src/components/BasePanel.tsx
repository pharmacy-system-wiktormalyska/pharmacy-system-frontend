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
            <Columns>

                {children}
            </Columns>
        </>
    );
}

export default BasePanel;

const Header = styled.div`
    display: flex;
    width: 100%;
    background-color: ${colorPalette.header.hex};
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 1rem 0;
`

const Columns = styled.div`
    display: flex;
    padding: 0 10 px 0 10px;
`

const HeaderText = styled.div`
    color: ${colorPalette.darkText.hex};
    padding: 1rem 0;
    font-size: 25px;
    font-family: "Outfit Medium", sans-serif;
`;
