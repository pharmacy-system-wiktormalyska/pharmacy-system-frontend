import BasePanel from "../../../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../../../values/colors.ts";
import {useEffect, useState} from "react";
import {StyledTable} from "../../../../components/StyledTable.tsx";
import {ManagerResponse} from "../../../../values/BackendValues.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {AddManagerPopover} from "./AddManagerPopover.tsx";
import {UpdateManagerPopover} from "./UpdateManagerPopover.tsx";
import {RemoveManagerPopover} from "./RemoveManagerPopover.tsx";
import { format } from 'date-fns';
import {useGetAllManagers} from "../../../../connection/hooks/useManagers.tsx";

export const ManagerPanel = () => {
    const [managers, setManagers] = useState<ManagerResponse[] | null>([]);
    const {showPopover} = usePopover()

    const [selectedRow, setSelectedRow] = useState<ManagerResponse | null>(null)

    const {data: allManagers} = useGetAllManagers()

    useEffect(() => {
        setManagers(allManagers)
        console.log(allManagers)
    }, [allManagers]);


    const showAddPopover = () => {
        showPopover(<AddManagerPopover/>)
        setSelectedRow(null)
    }

    const showUpdatePopover = () => {
        if (selectedRow !== null) {
            showPopover(<UpdateManagerPopover managerResponse={selectedRow}/>)
            setSelectedRow(null)
        }
    }
    const showRemovePopover = () => {
        if (selectedRow !== null) {
            showPopover(RemoveManagerPopover())
            setSelectedRow(null)
        }
    }

    const handleRowClick = (order: ManagerResponse) => {
        setSelectedRow(order)
    };

    const tableHead = () => (
        <>
            <th>Manager ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Family Name</th>
            <th>Place of Birth</th>
            <th>Nationality</th>
            <th>Address</th>
            <th>Correspondence Address</th>
            <th>Fathers Name</th>
            <th>Mothers Name</th>
            <th>Education</th>
            <th>Pharmacies ID's</th>
        </>
    );

    const tableBody = () => (
        <>

            {managers?.map((manager) => (
                <TableRow
                    key={manager.id}
                    onClick={() => handleRowClick(manager)}
                    isSelected={selectedRow !== null && selectedRow.id === manager.id}
                >
                    <td>{manager.id}</td>
                    <td>{manager.name}</td>
                    <td>{manager.surname}</td>
                    <td>{manager.familyName}</td>
                    <td>{manager.placeOfBirth}</td>
                    <td>{format(manager.dateOfBirth, 'yyyy/MM/dd')}</td>
                    <td>{manager.nationality}</td>
                    <td>{manager.address}</td>
                    <td>{manager.correspondenceAddress}</td>
                    <td>{manager.fathersName}</td>
                    <td>{manager.mothersName}</td>
                    <td>{manager.education}</td>
                    <td>{manager.pharmacyIds}</td>
                </TableRow>
            ))}
        </>
    );

    return (
        <BasePanel title="Admin Manager Panel">
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