import styled from "styled-components";
import {Button, Dropdown, Form} from "react-bootstrap";
import {fetchBackend, getDrugOrders} from "../../../connection/fetchBackend.tsx";
import {useEffect, useState} from "react";
import {
    DrugOrderResponse,
    DrugResponse,
    ManagerResponse,
    OrderStatus,
    PharmacistResponse
} from "../../../values/BackendValues.tsx";
import NumberInputWithArrows from "../../../components/NumberInputWithArrows.tsx";
import {StyledTable} from "../../../components/StyledTable.tsx";
import colorPalette from "../../../values/colors.ts";
import {format} from "date-fns";

export const UpdateDrugOrderPopover = ({token, drugOrderResponse}: {token: string | null, drugOrderResponse : DrugOrderResponse}) => {
    const [drugs, setDrugs] =  useState<DrugResponse[]>([])
    //TODO: Get drugOrderResponse by id
    const [selectedDrug, setSelectedDrug] = useState<DrugResponse>()
    const [selectedDrugCommonName, setSelectedDrugCommonName] = useState<string>("Select Drug")

    const [managers, setManagers] =  useState<ManagerResponse[]>([])
    const [selectedManager, setSelectedManager] = useState<ManagerResponse>()
    const [selectedManagerName, setSelectedManagerName] = useState<string>("None")

    const [pharmacists, setPharmacists] =  useState<PharmacistResponse[]>([])
    const [selectedPharmacist, setSelectedPharmacist] = useState<PharmacistResponse>()
    const [selectedPharmacistName, setSelectedPharmacistName] = useState<string>("None")

    const [amount, setAmount] = useState(1);

    const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>(OrderStatus[drugOrderResponse.orderStatus])
    const [isActive, setIsActive] = useState<boolean>(drugOrderResponse.isActive)

    useEffect(() => {
        console.log(drugOrderResponse)
        const {data} = use


        const fetchManagers = async () => {
            const managersFetched:ManagerResponse[] = [
                {
                    id: 1,
                    name: "John",
                    surname: "Doe",
                    familyName: "Doe",
                    placeOfBirth: "City, Country",
                    dateOfBirth: "1980-01-01",
                    nationality: "Country",
                    address: "123 Main St, City, Country",
                    correspondenceAddress: "456 Correspondence Rd, City, Country",
                    fathersName: "Robert Doe",
                    mothersName: "Jane Doe",
                    education: "Bachelor's Degree in Pharmacy",
                    pharmacyIds: [101, 102, 103]
                }
            ]
            setManagers(managersFetched)

            /*TODO: Podłącz do bazy */

            // try {
            //     const response = await fetchBackend("/manager/get/all", "GET", token);
            //     if (response) {
            //         setManagers(response);
            //     }
            // } catch (error) {
            //     console.error("Error fetching data:", error);
            // }
        };

        fetchManagers().then(() => console.log("Fetched Manager Data"));
    }, [token]);

    const pickDrug = (drug : DrugResponse) => {
        setSelectedDrug(drug)
        setSelectedDrugCommonName(drug.commonName)
    }

    const pickPharmacist = (pharmacist : PharmacistResponse) => {
        setSelectedPharmacist(pharmacist)
        setSelectedPharmacistName(pharmacist.name)
    }

    const pickManager = (manager : ManagerResponse) => {
        setSelectedManager(manager)
        setSelectedManagerName(manager.name + " " + manager.familyName)
    }


    const SubmitDrugOrder = () => {
        //TODO: Add Submit logic
    }

    const handleOrderStatusClick = (orderStatus: string) => {
        setSelectedOrderStatus(orderStatus)
    }

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
            <th></th>
        </>
    );

    const tableBody = () =>
    {
        const handleAmountChange = (newAmount: number) => {
            setAmount(newAmount);
        };

        const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIsActive(e.target.checked);
        }

        //TODO: Replace id with name from backend
        if (drugOrderResponse === null) return null
        return (
            <>
                <tr
                    key={drugOrderResponse.id}
                >
                    <td>{drugOrderResponse.id}</td>
                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedDrugCommonName}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {drugs.map((drug: DrugResponse) => (
                                    <Dropdown.Item key={drug.id} onClick={() => pickDrug(drug)}>
                                        {drug.commonName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>
                        <NumberInputWithArrows max={99} base_amount={drugOrderResponse.quantity} onValueChange={handleAmountChange}/>
                    </td>
                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedPharmacistName}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {pharmacists.map((pharmacist: PharmacistResponse) => (
                                    <Dropdown.Item key={pharmacist.id} onClick={() => pickPharmacist(pharmacist)}>
                                        {pharmacist.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedManagerName}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {managers.map((manager: ManagerResponse) => (
                                    <Dropdown.Item key={manager.id} onClick={() => pickManager(manager)}>
                                        {manager.name + " " + manager.familyName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>

                    <td>
                        <Dropdown drop={"down"}>
                            <DropdownPick id="dropdown-basic">
                                {selectedOrderStatus}
                            </DropdownPick>

                            <Dropdown.Menu>
                                {Object.keys(OrderStatus)
                                    .filter((key) => isNaN(Number(key)))
                                    .map((orderStatus) => (
                                        <Dropdown.Item
                                            key={orderStatus}
                                            onClick={() => handleOrderStatusClick(orderStatus)}
                                        >
                                            {orderStatus}
                                        </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>{format(drugOrderResponse.creationDateTime, 'yyyy/MM/dd')}</td>
                    <td>{format(drugOrderResponse.modificationDateTime, 'yyyy/MM/dd')}</td>
                    <td>
                        <Checkbox
                            type={"checkbox"}
                            id={`default-checkbox`}
                            checked={isActive}
                            onChange={handleActiveChange}
                        />
                    </td>
                    <td>
                        <SubmitButton onClick={SubmitDrugOrder}>Submit</SubmitButton>
                    </td>
                </tr>
            </>
        );
    }


    return (
        /*TODO: Dodaj fetch drugów do wyboru i post z nowym orderem */
        <Content>
            <Title>Update Drug Order</Title>
            <DrugOrderInfo>
                <StyledTable thead={tableHead()} tbody={tableBody()}></StyledTable>
            </DrugOrderInfo>
        </Content>
    )
}
const Checkbox = styled(Form.Check)`
    input {
        background-color: ${colorPalette.header.hex};
    }
    
`

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