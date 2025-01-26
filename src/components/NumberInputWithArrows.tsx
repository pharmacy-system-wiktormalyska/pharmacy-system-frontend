import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import colorPalette from "../values/colors.ts";

interface NumberInputWithArrowsProps {
    id?: number
    label?: string
    min?: number
    max: number
    base_amount? : number
    onValueChange : (number: number, id: number | undefined) => void
}

const NumberInputWithArrows = ({id = 0,label, max, min = 1, base_amount = 1, onValueChange}:NumberInputWithArrowsProps) => {
    const [value, setValue] = useState(base_amount);

    const increment = () => {
        if (value < max) {
            const newValue = value + 1;
            setValue(newValue);
            onValueChange(newValue, id);
        }
    };

    const decrement = () => {
        if (value > min) {
            const newValue = value - 1;
            setValue(newValue);
            onValueChange(newValue, id);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue >= min && newValue <= max) {
            setValue(newValue);
            onValueChange(newValue, id);
        }
    };


    return (
        <>

            <NumberInputWithArrowsWrapper>
                <Label>{label}</Label>
                <ButtonDecrease onClick={decrement} >-</ButtonDecrease>
                <NumberInput type={"number"} value={value} onChange={handleChange}/>
                <ButtonIncrease onClick={increment} >+</ButtonIncrease>
            </NumberInputWithArrowsWrapper>
        </>

    );
}
const Label = styled.div`
    padding-right: 0.5rem;
`

const ButtonDecrease = styled.button`
    background-color: ${colorPalette.header.hex};
    border: 0;
    width: 25px;
    height: 38px;
    border-radius: 0.5rem 0 0 0.5rem;
`

const ButtonIncrease = styled.button`
    background-color: ${colorPalette.header.hex};

    border: 0;
    width: 25px;
    height: 38px;
    border-radius: 0 0.5rem 0.5rem 0;
`

const NumberInput = styled.input`
    background-color: ${colorPalette.header.hex};
    text-align: center;
    border: 0;
    width: 50px;
    height: 38px;
`

const NumberInputWithArrowsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
`

export default NumberInputWithArrows;