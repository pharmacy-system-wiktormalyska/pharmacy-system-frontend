import { OrderItemResponse } from "../../../values/BackendValues.tsx";
import styled from "styled-components";
import { StyledTable } from "../../StyledTable.tsx";
import { Button } from "react-bootstrap";
import { usePopover } from "../PopoverContext.tsx";
import React from "react";

interface PaymentPopoverProps {
    boughtItems: OrderItemResponse[];
}

export const PaymentPopover: React.FC<PaymentPopoverProps> = ({ boughtItems }) => {
    const { hidePopover } = usePopover();

    const tableHead = () => (
        <>
            <th>Drug Name</th>
            <th>Quantity</th>
            <th>Price/One</th>
            <th>Total</th>
        </>
    );

    const tableBody = () => {
        return (
            <>
                {boughtItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.drug.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price && "zł"}</td>
                        <td>{item.price && item.price * item.quantity && "zł"}</td>
                    </tr>
                ))}
            </>
        );
    };

    const completePayment = () => {


        hidePopover();
        //TODO:Implement order history post
    };

    return (
        <Content>
            <Title>Payment Info</Title>
            <DrugOrderInfo>
                <StyledTable thead={tableHead()} tbody={tableBody()}></StyledTable>
            </DrugOrderInfo>
            <PayButton onClick={completePayment}>Complete Payment</PayButton>
        </Content>
    );
};

// Styled Components
const DrugOrderInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 100%;
    padding-top: 2rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
`;

const Title = styled.div`
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
`;

const PayButton = styled(Button)`
    margin-top: 2rem;
    background-color: green;
    border-color: green;

    &:hover {
        background-color: darkgreen;
        border-color: darkgreen;
    }
`;
