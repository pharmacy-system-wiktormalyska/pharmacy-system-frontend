import {useEffect, useState} from 'react';
import styled from 'styled-components';
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";
import {AiOutlineClose} from 'react-icons/ai';
import {StyledTable} from "../../components/StyledTable.tsx";
import {useGetAllWarehouses} from "../../connection/hooks/useWarehouse.tsx";
import {
    DrugOrderResponse,
    DrugResponse,
    OrderStatus,
    PharmacistResponse,
    WarehouseItemResponse,
    WarehouseResponse
} from "../../values/BackendValues.tsx";
import {useGetPharmacistById} from "../../connection/hooks/usePharmacist.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useGetDrugById} from "../../connection/hooks/useDrug.tsx";
import {
    useAcceptDrugOrderById, useAddDrugOrder,
    useGetDrugOrderById,
    useRejectDrugOrderById
} from "../../connection/hooks/useDrugsOrders.tsx";

const WarehousePanel = () => {
    const [activeTab, setActiveTab] = useState<string | 'warehouse'>('warehouse');
    const [selectedDetails, setSelectedDetails] = useState<WarehouseItemResponse | null>(null);
    const [pharmacist, setPharmacist] = useState<PharmacistResponse | null>(null)
    const [personelWarehouse, setPersonelWarehouse] = useState<WarehouseResponse | null>(null)

    const {data:fetchedWarehouses} = useGetAllWarehouses()
    const {mutate: fetchPharmacist} = useGetPharmacistById()
    const {mutate: fetchDrug} = useGetDrugById()
    const {mutate: fetchDrugOrder} = useGetDrugOrderById()
    const {mutate: postAcceptDrugOrder} = useAcceptDrugOrderById()
    const {mutate: postRejectDrugOrder} = useRejectDrugOrderById()
    const {mutate: addDrugOrder} = useAddDrugOrder()

    const {storedDecodedToken} = useAuth()

    const [drugs, setDrugs] = useState<Record<string, DrugResponse>>({});
    const [drugOrders, setDrugOrders] = useState<DrugOrderResponse[]>([]);

    //TODO: Czytać z backend
    useEffect(() => {
        if (!storedDecodedToken) return;

        fetchPharmacist(
            { param: storedDecodedToken.user_id.toString() },
            {
                onSuccess: (data) => {
                    setPharmacist(data);
                },
                onError: (error) => {
                    console.error(error);
                }
            }
        );
    }, [storedDecodedToken]);

    useEffect(() => {
        if (!pharmacist) return;
        if (!fetchedWarehouses) return;

        const foundWarehouse = fetchedWarehouses.find((warehouse: { pharmacyIds: number[]; }) =>
            warehouse.pharmacyIds.includes(pharmacist.pharmacyId)
        );
        if (!foundWarehouse) return;
        setPersonelWarehouse(foundWarehouse);

        if (!foundWarehouse?.drugOrderIds) return;

        getDrugOrders(foundWarehouse)
    }, [pharmacist, fetchedWarehouses]);

    useEffect(() => {
        if (!pharmacist) return;
        if (!personelWarehouse) return;
        if (!personelWarehouse?.stock) return;
        if (!drugOrders) return;

        const mergedItems = [
            ...personelWarehouse?.stock ?? [],
            ...drugOrders
        ];

        mergedItems.forEach((item: { drugId: string | number; }) => {
            if (drugs[item.drugId]) return;

            fetchDrug(
                { param: item.drugId.toString() },
                {
                    onSuccess: (data) => {
                        setDrugs((prev) => ({ ...prev, [item.drugId]: data }));
                    },
                    onError: (error) => {
                        console.error("Error fetching drug:", error);
                    }
                }
            );
        });
    }, [pharmacist, personelWarehouse, drugOrders, drugs]);

    const getDrugOrders = (foundWarehouse:WarehouseResponse) => {
        foundWarehouse.drugOrderIds.forEach((id:number) => {
            if (!drugOrders.find(drugOrder => drugOrder.id === id))

            fetchDrugOrder(
                {param: id.toString()},
                {
                    onSuccess: (data) => {
                        setDrugOrders((prev) => [...prev, data]);
                    }
                }
            )
        })
    }

    const openDetails = (item: WarehouseItemResponse) => setSelectedDetails(item);
    const closeDetails = () => setSelectedDetails(null);

    const rejectOrder = (drugOrder: DrugOrderResponse) => {
        if (!personelWarehouse) return;
        if (!drugOrder.id) return;
        postRejectDrugOrder(
            {param: drugOrder.id.toString()},
            {
                onSuccess: () => {
                    alert("Successfully Rejected Order!")
                },
                onError: (error) => {
                    console.error(error)
                }
            }
        )
        getDrugOrders(personelWarehouse)
    }

    const acceptOrder = (drugOrder: DrugOrderResponse) => {
        if (!personelWarehouse) return;
        if (!drugOrder.id) return;
        postAcceptDrugOrder(
            {param: drugOrder.id.toString()},
            {
                onSuccess: () => {
                    alert("Successfully Accepted Order!")
                },
                onError: (error) => {
                    console.error(error)
                }
            }
        )
        getDrugOrders(personelWarehouse)
    }

    const createOrder = (warehouseItem:WarehouseItemResponse) => {
        const drugOrder:DrugOrderResponse = {
            warehouseId: personelWarehouse?.id || 0,
            drugId: warehouseItem.drugId,
            quantity: 1,
            pharmacistId: pharmacist?.id || 0,
            managerId: personelWarehouse?.managerId || 0,
            orderStatus: OrderStatus.PENDING,
            modificationDateTime: new Date(),
            completionDateTime: null,
            isActive: true,
            creationDateTime: new Date(),
            id: null
        }

        addDrugOrder(
            {body: drugOrder},
            {
                onSuccess: ()=> {
                    alert("Successfully ordered drug: "+drugs[warehouseItem.drugId].name)
                },
                onError: (error) => {
                    console.error(error)
                }
            }
        )
    }

    const tableHead = () => {
        return (
            <>
                {activeTab === 'warehouse' && (
                    <>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th>Action</th>
                    </>
                )}
                {activeTab === 'requestList' && (
                    <>
                        <th>Name</th>
                        <th>Pharmacist</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </>
                )}
            </>
        )
    }

    const tableBody = () => {
        return (
            <>
            {activeTab === 'warehouse' &&
                personelWarehouse?.stock.map((warehouseItem, index) => {
                    const drug = drugs[warehouseItem.drugId];
                    if (!drug) return null;
                    return (
                        <tr key={index}>
                            <td>{drug.commonName}</td>
                            <td>{warehouseItem.quantity}</td>
                            <td>{warehouseItem.priceInCents}</td>
                            <td>
                                <ActionButton onClick={() => createOrder(warehouseItem)}>Order</ActionButton>
                                <DetailsButton onClick={() => openDetails(warehouseItem)}>Details</DetailsButton>
                            </td>
                        </tr>
                    );
                })}
                {activeTab === 'requestList' &&
                    drugOrders
                        .filter((request) => request.orderStatus === OrderStatus.PENDING)
                        .map((request, index) => (
                        <tr key={index}>
                            <td>{drugs[request.drugId].name}</td>
                            <td>{request.pharmacistId}</td>
                            <td>{request.quantity}</td>
                            <td>
                                <ActionButton onClick={() => {acceptOrder(request)}}>Order</ActionButton>
                                <RejectButton onClick={() => {rejectOrder(request)}}>Reject</RejectButton>
                                {/*<DetailsButton onClick={() => openDetails(drugs[request.drugId])}>Details</DetailsButton>*/}
                            </td>
                        </tr>
                ))}
            </>
        )
    }
    return (
        <BasePanel title="Warehouse panel" panelKey="warehouse">
            <CenteredContainer>
                <ButtonGroup>
                    <TabButton
                        active={(activeTab === 'warehouse').toString()}
                        onClick={() => setActiveTab('warehouse')}
                    >
                        Order by Warehouse
                    </TabButton>
                    <TabButton
                        active={(activeTab === 'requestList').toString()}
                        onClick={() => setActiveTab('requestList')}
                    >
                        Order by Request List
                    </TabButton>
                </ButtonGroup>
                <StyledTable thead={tableHead()} tbody={tableBody()}
            />

                {selectedDetails && (
                    <PopupOverlay onClick={closeDetails}>
                        <PopupContainer onClick={(e) => e.stopPropagation()}>
                            <PopupHeader>
                                <CloseButton onClick={closeDetails}>
                                    <AiOutlineClose />
                                </CloseButton>
                            </PopupHeader>
                            <PopupContent>
                                <CustomH3>{drugs[selectedDetails.drugId].name}</CustomH3>
                                <CustomP>
                                    <CustomStrong>Stock</CustomStrong>
                                    {selectedDetails.quantity}
                                </CustomP>
                                <CustomP>
                                    <CustomStrong>Description</CustomStrong>
                                    {drugs[selectedDetails.drugId].activeSubstance}
                                </CustomP>
                            </PopupContent>
                        </PopupContainer>
                    </PopupOverlay>
                )}
            </CenteredContainer>
        </BasePanel>
    );
};

export default WarehousePanel;

const CustomH3 = styled.h3`
    color: ${colorPalette.darkText.hex};
`
const CustomP = styled.p`
    color: ${colorPalette.darkText.hex};
`
const CustomStrong = styled.strong`
    color: ${colorPalette.darkText.hex};
`

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;


const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 3rem 0;
`;


const TabButton = styled.button<{ active?: string}>`
    background-color: ${(props) => (props.active ? '#00296b' : '#495057')};
    color: ${(props) => (props.active ? '#f1f2f6' : '#f1f2f6')};
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: "Outfit Medium", sans-serif;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? '#003f88' : '#6c757d')};
    }
`;


const ActionButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 10px;
    font-family: "Outfit Medium", sans-serif;
    margin: 0 5px;

    &:hover {
        background-color: #45a049;
    }
`;


const RejectButton = styled(ActionButton)`
    background-color: #f44336;

    &:hover {
        background-color: #d32f2f;
    }
`;


const DetailsButton = styled(ActionButton)`
    background-color: #2196F3;

    &:hover {
        background-color: #1976D2;
    }
`;


const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;


const PopupContainer = styled.div`
    background-color: ${colorPalette.windowBackground.hex};
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    height: auto;
    color: ${colorPalette.darkText.hex};
`;


const PopupHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`;


const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${colorPalette.darkText.hex};
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const PopupContent = styled.div`
    margin-top: 20px;

    h3 {
        font-size: 28px;
        font-family: "Outfit Medium", sans-serif;
        margin-bottom: 35px;
        text-align: center;
    }

    h3::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${colorPalette.contrastingLightGray.hex};
        margin-top: 20px;
    }

    p {
        margin-bottom: 20px;
        text-align: center;
        font-size: 20px;
        font-family: "Outfit Light", sans-serif;
    }

    p strong {
        display: block;
        margin-bottom: 5px;
        font-size: 20px;
        font-family: "Outfit Regular", sans-serif;
    }
`;