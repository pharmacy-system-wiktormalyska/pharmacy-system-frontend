import styled from "styled-components";
import colorPalette from "../values/colors.ts";

interface StyledTableProps {
    thead: React.ReactNode | (() => React.ReactNode)
    tbody: React.ReactNode | (() => React.ReactNode)
}

export const StyledTable = ({thead, tbody}:StyledTableProps) => {
    const renderContent = (content: React.ReactNode | (() => React.ReactNode)) => {
        return typeof content === "function" ? content() : content;
    };
    return (
        <StyledTableContainer>
            <StyledTableComponent>
                <thead>
                <tr>
                    {renderContent(thead)}
                </tr>
                </thead>
                <tbody>
                    {renderContent(tbody)}
                </tbody>
            </StyledTableComponent>
        </StyledTableContainer>
    )

}

const StyledTableContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    overflow-x: auto;
`;

const StyledTableComponent = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: ${colorPalette.lightBackground.hex};
    border-radius: 10px;
    overflow: hidden;

    th, td {
        padding: 15px;
        text-align: center;
        font-family: "Outfit Regular", sans-serif;
        color: #000;
        border-bottom: 1px solid ${colorPalette.lightBackgroundShadow.hex};
    }

    th {
        background-color: ${colorPalette.lightBackgroundShadow.hex};
        font-size: 16px;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        th, td {
            font-size: 14px;
            padding: 10px;
        }
    }

    @media (max-width: 480px) {
        th, td {
            font-size: 12px;
            padding: 8px;
        }
    }
`;
