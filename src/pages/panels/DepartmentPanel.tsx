import BasePanel from "../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../values/colors.ts";


const DepartmentPanel = () => {
    return (
        <BasePanel title="Department Panel" key={"department"}>
            <Column width={"auto"}>
                <Tile height={"auto"}>
                    <PrescriptionIcon className="bi bi-prescription"></PrescriptionIcon>
                    <span style={{fontSize: "1.5rem"}}>Fulfill a prescription</span>
                </Tile>
                <Tile>

                </Tile>
            </Column>
            <Column>
1
            </Column>
        </BasePanel>
    )
}

export default DepartmentPanel

const PrescriptionIcon = styled.i`
    font-size: 10rem;
`

interface TileProps {
    height? : string
}

const Tile = styled.div<TileProps>`
    display: flex;
    width: 100%;
    height: ${(props) => props.height || "100%"};
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colorPalette.lightBackground.hex};
    border-radius: 1rem;
    padding: 1rem;
`

interface ColumnProps {
    width? : string
}

const Column = styled.div<ColumnProps>`
    width: ${(props) => props.width || "100%"};
    height: 100%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    color: ${colorPalette.darkText.hex};
    gap: 1rem;
    
`