import styled from "styled-components";
import { usePopover } from "./PopoverContext.tsx";
import colorPalette from "../../values/colors.ts";

export const Popover = () => {
    const { isVisible, content, hidePopover } = usePopover()

    if (!isVisible) return null

    return (
        <PopoverWrapper>
            <PopoverContentWrapper>
                <CloseButton onClick={hidePopover}><i className="bi bi-x"></i></CloseButton>
                <Content>{content}</Content>
            </PopoverContentWrapper>
        </PopoverWrapper>
    )
}

const CloseButton = styled.button`
    position: absolute;
    top: 10px;  /* Adjust as needed */
    left: 10px; /* Adjust as needed */
    width: 30px;
    height: 30px;
    background-color: transparent;
    color: ${colorPalette.text.hex};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 2rem;
`
const Content =styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
`

const PopoverContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    background-color: ${colorPalette.header.hex};
    border-radius: 1rem;
    position: relative; /* Make sure CloseButton is positioned relative to this container */
`

const PopoverWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
    display: flex;
    backdrop-filter: blur(10px);  /* Apply blur effect */
    -webkit-backdrop-filter: blur(10px);  /* For Safari support */
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    overflow: visible;
`
