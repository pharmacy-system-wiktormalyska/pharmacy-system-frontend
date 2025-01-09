import BasePanel from "../../../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../../../values/colors.ts";
import {useEffect, useState} from "react";
import {StyledTable} from "../../../../components/StyledTable.tsx";
import {DrugOrderResponse} from "../../../../values/BackendValues.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {AddDrugOrderPopover} from "./AddDrugOrderPopover.tsx";
import {UpdateDrugOrderPopover} from "./UpdateDrugOrderPopover.tsx";
import {RemoveDrugOrderPopover} from "./RemoveDrugOrderPopover.tsx";
import { format } from 'date-fns';
import {useGetAllDrugOrders} from "../../../../connection/hooks/useDrugsOrders.tsx";

export const DrugOrderPanel = () => {
    const [drugOrders, setDrugOrders] = useState<DrugOrderResponse[] | null>([]);
    const {showPopover} = usePopover()

    const [selectedRow, setSelectedRow] = useState<DrugOrderResponse | null>(null)

    const {data: allDrugOrders} = useGetAllDrugOrders()

    useEffect(() => {
        setDrugOrders(allDrugOrders)
        console.log(allDrugOrders)
    }, [allDrugOrders]);


    const showAddPopover = () => {
        showPopover(<AddDrugOrderPopover/>)
        setSelectedRow(null)
    }

    const showUpdatePopover = () => {
        if (selectedRow !== null) {
            showPopover(<UpdateDrugOrderPopover drugOrderResponse={selectedRow}/>)
            setSelectedRow(null)
        }
    }
    const showRemovePopover = () => {
        if (selectedRow !== null) {
            showPopover(RemoveDrugOrderPopover())
            setSelectedRow(null)
        }
    }

    const handleRowClick = (order: DrugOrderResponse) => {
        setSelectedRow(order)
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
                <TableRow
                    key={order.id}
                    onClick={() => handleRowClick(order)}
                    isSelected={selectedRow!==null && selectedRow.id === order.id}
                >
                    <td>{order.id}</td>
                    <td>{order.drugId}</td>
                    <td>{order.quantity}</td>
                    <td>{order.pharmacistId}</td>
                    <td>{order.managerId}</td>
                    <td>{order.orderStatus}</td>
                    <td>{format(order.creationDateTime, 'yyyy/MM/dd')}</td>
                    <td>{format(order.modificationDateTime, 'yyyy/MM/dd')}</td>
                    <td>
                        {order.isActive ? (
                        <span role="img" aria-label="Active">
                          ✅
                        </span>
                        ) : (
                        <span role="img" aria-label="Inactive">
                          ❌
                        </span>
                    )}
                    </td>
                </TableRow>
            ))}
        </>
    );

    return (
        <BasePanel title="Admin Drug Order Panel">
            <Body>
                <Options>
                    <Option onClick={() => {showAddPopover()}}>Add</Option>
                    <Option onClick={() => {showUpdatePopover()}}>Update</Option>
                    <Option onClick={() => {showRemovePopover()}}>Remove</Option>
                    <Option onClick={() => {setSelectedRow(null)}}>Remove Selection</Option>
                </Options>
                <StyledTable thead={tableHead()} tbody={tableBody()} />
            </Body>
        </BasePanel>
    );
};
//TODO: Fix React does not recognize the `isSelected` prop on a DOM element.
const TableRow = styled.tr<{ isSelected: boolean }>`
    background-color: ${({ isSelected }) =>
            isSelected ? "rgba(0,0,0,0.3)" : "transparent"};
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;
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