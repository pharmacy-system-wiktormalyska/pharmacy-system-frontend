import BasePanel from "../../../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../../../values/colors.ts";
import {useEffect, useState} from "react";
import {StyledTable} from "../../../../components/StyledTable.tsx";
import {PharmacyResponse} from "../../../../values/BackendValues.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {AddPharmacyPopover} from "./AddPharmacyPopover.tsx";
import {UpdatePharmacyPopover} from "./UpdatePharmacyPopover.tsx";
import {RemovePharmacyPopover} from "./RemovePharmacyPopover.tsx";
import {useGetAllPharmacies} from "../../../../connection/hooks/usePharmacy.tsx";

export const PharmacyPanel = () => {
    const [pharmacies, setPharmacies] = useState<PharmacyResponse[] | null>([]);
    const {showPopover} = usePopover()

    const [selectedRow, setSelectedRow] = useState<PharmacyResponse | null>(null)

    const {data: allPharmacies, refetch} = useGetAllPharmacies()

    useEffect(() => {
        setPharmacies(allPharmacies)
    }, [allPharmacies]);

    const refreshData = () => {
        setTimeout(() => {
            refetch().then(() => {});
        }, 1000);
    }

    const showAddPopover = () => {
        showPopover(<AddPharmacyPopover onActionComplete={refreshData}/>)
        setSelectedRow(null)
    }

    const showUpdatePopover = () => {
        if (selectedRow !== null) {
            showPopover(<UpdatePharmacyPopover pharmacyResponse={selectedRow} onActionComplete={refreshData}/>)
            setSelectedRow(null)
        }
    }

    const showRemovePopover = () => {
        if (selectedRow !== null) {
            showPopover(<RemovePharmacyPopover pharmacy={selectedRow} onActionComplete={refreshData}/>)
            setSelectedRow(null)
        }
    }

    const handleRowClick = (pharmacy: PharmacyResponse) => {
        setSelectedRow(pharmacy)
    };

    const tableHead = () => (
        <>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
        </>
    );

    const tableBody = () => (
        <>
            {pharmacies?.map((pharmacy) => (
                <TableRow
                    key={pharmacy.id}
                    onClick={() => handleRowClick(pharmacy)}
                    isSelected={selectedRow !== null && selectedRow.id === pharmacy.id}
                >
                    <td>{pharmacy.id}</td>
                    <td>{pharmacy.name}</td>
                    <td>{pharmacy.address}</td>
                    <td>{pharmacy.type}</td>
                    <td>{pharmacy.owner}</td>
                    <td>{pharmacy.phone}</td>
                    <td>{pharmacy.email}</td>
                    <td>{pharmacy.website}</td>
                </TableRow>
            ))}
        </>
    );

    return (
        <BasePanel title="Admin Pharmacy Panel">
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

const TableRow = styled.tr.withConfig({
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>`
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