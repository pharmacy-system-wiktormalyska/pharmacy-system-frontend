import styled from "styled-components";
import {Form} from "react-bootstrap";
import colorPalette from "../values/colors.ts";

export const Checkbox = styled(Form.Check)`
    input {
        background-color: ${colorPalette.header.hex};
    }
    
`