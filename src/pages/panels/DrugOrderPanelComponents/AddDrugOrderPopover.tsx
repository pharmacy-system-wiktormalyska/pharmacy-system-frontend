import styled from "styled-components";
import {Button, Dropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import {DrugOrderResponse, DrugResponse, ManagerResponse, OrderStatus} from "../../../values/BackendValues.tsx";
import NumberInputWithArrows from "../../../components/NumberInputWithArrows.tsx";
import {StyledTable} from "../../../components/StyledTable.tsx";
import colorPalette from "../../../values/colors.ts";
import {useGetAllDrugs} from "../../../connection/hooks/useDrug.tsx";
import {useGetAllManagers} from "../../../connection/hooks/useManagers.tsx";

export const AddDrugOrderPopover = () => {
    const [drugs, setDrugs] =  useState<DrugResponse[]>([])
    const [selectedDrug, setSelectedDrug] = useState<DrugResponse>()
    const [selectedDrugCommonName, setSelectedDrugCommonName] = useState<string>("Select Drug")

    const [managers, setManagers] =  useState<ManagerResponse[]>([])
    const [selectedManager, setSelectedManager] = useState<ManagerResponse>()
    const [selectedManagerName, setSelectedManagerName] = useState<string>("None")

    const [amount, setAmount] = useState(1);

    const [isLoading, setIsLoading] = useState(true)
    const {data: fetchedDrugs} = useGetAllDrugs()
    const {data: fetchedManagers} = useGetAllManagers()
    useEffect(() => {
        setDrugs(fetchedDrugs)
        setManagers(fetchedManagers)
        setIsLoading(false)
    }, [fetchedDrugs, fetchedManagers]);

    const pickDrug = (drug : DrugResponse) => {
        setSelectedDrug(drug)
        setSelectedDrugCommonName(drug.commonName)
    }

    const pickManager = (manager : ManagerResponse) => {
        setSelectedManager(manager)
        setSelectedManagerName(manager.name + " " + manager.familyName)
    }

    const tableHead = () => (
        <>
            <th>Select Drug</th>
            <th>Amount</th>
            <th>Select Responsible Manager</th>
            <th></th>
        </>
    )

    const SubmitDrugOrder = () => {
        if (selectedDrug !== undefined && selectedManager !== undefined ){
            const SubmitRequest: DrugOrderResponse = {
                id: 0,
                drugId: selectedDrug.id,
                isActive: true,
                creationDateTime: new Date(),
                orderStatus: OrderStatus.PENDING,
                managerId: selectedManager.id,
                /*TODO: Dodać z JWT*/
                pharmacistId: 0,
                quantity: amount,
                modificationDateTime: new Date()
            }
            //TODO: Add post to backend
            console.log(SubmitRequest)
        }
    }

    const tableBody = () => {


        const handleAmountChange = (newAmount: number) => {
            setAmount(newAmount);
        };
        if (isLoading) return (<>Loading...</>)

        const safeDrugs = drugs || [];
        const safeManagers = managers || [];

        return (
            <>
                <tr>
                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedDrugCommonName}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {safeDrugs.map((drug: DrugResponse) => (
                                    <Dropdown.Item key={drug.id} onClick={() => pickDrug(drug)}>
                                        {drug.commonName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>
                        <NumberInputWithArrows max={99} base_amount={1} onValueChange={handleAmountChange}/>
                    </td>
                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedManagerName}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {safeManagers.map((manager: ManagerResponse) => (
                                    <Dropdown.Item key={manager.id} onClick={() => pickManager(manager)}>
                                        {manager.name + " " + manager.familyName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>
                        <SubmitButton onClick={SubmitDrugOrder}>Submit</SubmitButton>
                    </td>
                </tr>

            </>
        )
    }


    return (
        /*TODO: Dodaj fetch drugów do wyboru i post z nowym orderem */
        <Content>
            <Title>Add Drug Order</Title>
            <DrugOrderInfo>
                <StyledTable thead={tableHead()} tbody={tableBody()}></StyledTable>
            </DrugOrderInfo>
        </Content>
    )
}



const SubmitButton = styled(Button)`
    background-color: ${colorPalette.header.hex};
`

const DropdownPick = styled(Dropdown.Toggle)`
    background-color: ${colorPalette.header.hex};
`
const DrugOrderInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 100%;
    padding-top: 2rem;

`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
`

const Title = styled.div`
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
`