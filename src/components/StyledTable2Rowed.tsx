import styled from "styled-components";
import colorPalette from "../values/colors.ts";

interface StyledTableProps {
    thead1: React.ReactNode | (() => React.ReactNode)
    thead2: React.ReactNode | (() => React.ReactNode)
    tbody1: React.ReactNode | (() => React.ReactNode)
    tbody2: React.ReactNode | (() => React.ReactNode)
}

export const StyledTable2Rowed = ({thead1, tbody1, thead2, tbody2}:StyledTableProps) => {
    const renderContent = (content: React.ReactNode | (() => React.ReactNode)) => {
        return typeof content === "function" ? content() : content;
    };
    return (
        <StyledTableContainer>
            <StyledTableComponent>
                <thead>
                <tr>
                    {renderContent(thead1)}
                </tr>
                </thead>
                <tbody>
                {renderContent(tbody1)}
                </tbody>
                <thead>
                <tr>
                    {renderContent(thead2)}
                </tr>
                </thead>
                <tbody>
                {renderContent(tbody2)}
                </tbody>
            </StyledTableComponent>
        </StyledTableContainer>
    )

}

const StyledTableContainer = styled.div`
    width: auto; /* Dynamiczna szerokość */
    max-width: 100%; /* Opcjonalnie ograniczenie szerokości */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    overflow-x: auto; /* Dodanie przewijania w poziomie, jeśli tabela wykracza poza ekran */
    padding: 1rem; /* Opcjonalnie dla estetyki */
`;


const StyledTableComponent = styled.table`
    width: auto; /* Dopasowanie do zawartości */
    min-width: 100%; /* Minimalna szerokość */
    border-collapse: separate;
    border-spacing: 0;
    background-color: ${colorPalette.lightBackground.hex};
    border-radius: 1rem;

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

