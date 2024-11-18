import React from 'react';
import { HeaderText } from './HeaderText.tsx';
import styled from "styled-components";

interface BasePanelProps {
    title: string;
    children: React.ReactNode;
    panelKey?: string | number;
}

const BasePanel: React.FC<BasePanelProps> = ({ title, children, panelKey }) => {

    return (
        <div key={panelKey}>
            <Columns>
                <HeaderText style={{ color: "white" }}>{title}</HeaderText>
                {children}
            </Columns>
        </div>
    );
}

export default BasePanel;

const Columns = styled.div`
    display: flex;
    padding: 0 10 px 0 10px;
`