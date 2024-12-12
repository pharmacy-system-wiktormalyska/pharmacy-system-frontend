import BasePanel from "../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../values/colors.ts";
import { useEffect, useState } from "react";
import { StyledTable } from "../../components/StyledTable.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";
import {fetchBackend} from "../../connection/fetchBackend.tsx";
import {DrugOrderResponse} from "../../values/BackendValues.tsx";

export const DrugOrderPanel = () => {
    const [option, setOption] = useState<"add" | "update" | "remove">("add");
    const [drugOrders, setDrugOrders] = useState<DrugOrderResponse[] | null>([]);
    const { token } = useAuth();

    const fetchDrugOrders = async () => {
        const data = await fetchBackend("/drug/get/all", "POST", token);
        setDrugOrders(data);
    };

    useEffect(() => {
        fetchDrugOrders();
    }, [token]);

    const changeOption = (pickedOption: "add" | "update" | "remove") => {
        setOption(pickedOption);
    };

    const tableHead = () => (
        <>
            <th>Order ID</th>
            <th>Drug ID</th>
            <th>Quantity</th>
            <th>Pharmacist ID</th>
            <th>Manager ID</th>
            <th>Order Status</th>
            <th>Creation Date Time</th>
            <th>Modification Date Time</th>
            <th>Is Active</th>
        </>
    );

    const tableBody = () => (
        <>
            {drugOrders?.map((order) => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.drugId}</td>
                    <td>{order.quantity}</td>
                    <td>{order.pharmacistId}</td>
                    <td>{order.managerId}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.creationDateTime.toString()}</td>
                    <td>{order.modificationDateTime.toString()}</td>
                    <td>{order.isActive}</td>
                </tr>
            ))}
        </>
    );

    return (
        <BasePanel title="Drug Order Panel">
            <Body>
                <Options>
                    <Option onClick={() => changeOption("add")}>Add</Option>
                    <Option onClick={() => changeOption("update")}>Update</Option>
                    <Option onClick={() => changeOption("remove")}>Remove</Option>
                </Options>
                <StyledTable thead={tableHead()} tbody={tableBody()} />
            </Body>
        </BasePanel>
    );
};

const Body = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
`;

const Options = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: nowrap;
    gap: 1.5rem;
    font-size: 1.5rem;
`;

const Option = styled.div`
    background-color: ${colorPalette.header.hex};
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
    }
`;