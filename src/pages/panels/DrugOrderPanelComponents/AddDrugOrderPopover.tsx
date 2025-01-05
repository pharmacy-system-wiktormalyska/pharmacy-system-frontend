import styled from "styled-components";
import {Dropdown} from "react-bootstrap";

export const AddDrugOrderPopover = () => {
    return (
        /*TODO: Dodaj fetch drugów do wyboru i post z nowym orderem */
        <Content>
            <Title>Add Drug Order</Title>
            <DropdownPick>
                <Dropdown.Toggle id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </DropdownPick>
        </Content>
    )
}
const DropdownPick = styled(Dropdown)`
    
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
`

const Title = styled.div`
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
`