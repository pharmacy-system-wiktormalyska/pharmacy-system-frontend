import styled from "styled-components";
import {Button} from "react-bootstrap";
import {ManagerResponse} from "../../../../values/BackendValues.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {useRemoveManager} from "../../../../connection/hooks/useManagers.tsx";

interface RemoveManagerPopoverProps {
    onActionComplete: () => void
    manager: ManagerResponse
}
//TODO: Sprawdzić czy działa
export const RemoveManagerPopover = ({onActionComplete, manager}:RemoveManagerPopoverProps) => {
    const {hidePopover} = usePopover()
    const {mutate: removeDrug} = useRemoveManager()

    if(!manager) {
        hidePopover()
        return null
    }
    const clickNo = () => {
        hidePopover()
    }

    const clickYes = () => {
        if(!manager || !manager.id) {
            hidePopover()
            return
        }
        removeDrug({param: manager.id.toString()})
        onActionComplete()
        hidePopover()
    }
    return (
        <Content>
            <Title>Remove Manager</Title>
                <Text>Are you sure you want to remove manager:</Text>
                <Text>{manager.name+" "+manager.surname}</Text>
            <Buttons>
                <NoButton onClick={clickNo}>No</NoButton>
                <YesButton onClick={clickYes}>Yes</YesButton>
            </Buttons>
        </Content>
    )
}
const YesButton = styled(Button)`
    font-size: 2rem;
    padding: 0.5rem 1.5rem;
    background-color: green;
    border-color: green;
    &:hover {
        background-color: darkgreen;
        border-color: darkgreen;
    }
`

const NoButton = styled(Button)`
    font-size: 2rem;
    padding: 0.5rem 1.5rem;
    background-color: indianred;
    border-color: indianred;
    &:hover {
        background-color: red;
        border-color: red;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
`

const Text = styled.div`
    font-size: 1.5rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
`

const Title = styled.div`
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
`