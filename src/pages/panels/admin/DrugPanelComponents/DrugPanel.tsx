import BasePanel from "../../../../components/BasePanel.tsx";
import styled from "styled-components";
import colorPalette from "../../../../values/colors.ts";
import {useEffect, useState} from "react";
import {StyledTable} from "../../../../components/StyledTable.tsx";
import {DrugResponse} from "../../../../values/BackendValues.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {AddDrugPopover} from "./AddDrugPopover.tsx";
import {UpdateDrugPopover} from "./UpdateDrugPopover.tsx";
import {RemoveDrugPopover} from "./RemoveDrugPopover.tsx";
import {useGetAllDrugs} from "../../../../connection/hooks/useDrug.tsx";
//TODO: Implement All
export const DrugPanel = () => {
    const [drugs, setDrugs] = useState<DrugResponse[] | null>([]);
    const {showPopover} = usePopover()

    const [selectedRow, setSelectedRow] = useState<DrugResponse | null>(null)

    const {data: allDrugs} = useGetAllDrugs()

    useEffect(() => {
        setDrugs(allDrugs)
        console.log(allDrugs)
    }, [allDrugs]);


    const showAddPopover = () => {
        showPopover(<AddDrugPopover/>)
        setSelectedRow(null)
    }

    const showUpdatePopover = () => {
        if (selectedRow !== null) {
            showPopover(<UpdateDrugPopover drugResponse={selectedRow}/>)
            setSelectedRow(null)
        }
    }
    const showRemovePopover = () => {
        if (selectedRow !== null) {
            showPopover(RemoveDrugPopover())
            setSelectedRow(null)
        }
    }

    const handleRowClick = (order: DrugResponse) => {
        setSelectedRow(order)
    };

    const tableHead = () => (
        <>
            <th>ID</th>
            <th>Name</th>
            <th>Common Name</th>
            <th>Active Substance</th>
            <th>Marketing Authorization Holder</th>
            <th>Pharmaceutical Form</th>
            <th>MA Number</th>
            <th>ATC Code</th>
            <th>Strength</th>
            <th>Image URL</th>
        </>
    );

    const tableBody = () => (
        <>

            {drugs?.map((drug) => (
                <TableRow
                    key={drug.id}
                    onClick={() => handleRowClick(drug)}
                    isSelected={selectedRow !== null && selectedRow.id === drug.id}
                >
                    <td>{drug.id}</td>
                    <td>{drug.name}</td>
                    <td>{drug.commonName}</td>
                    <td>{drug.activeSubstance}</td>
                    <td>{drug.marketingAuthorizationHolder}</td>
                    <td>{drug.pharmaceuticalForm}</td>
                    <td>{drug.maNumber}</td>
                    <td>{drug.atcCode}</td>
                    <td>{drug.strength}</td>
                    <td>{drug.relativeImageUrl}</td>
                </TableRow>
            ))}
        </>
    );

    return (
        <BasePanel title="Admin Drug Panel">
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