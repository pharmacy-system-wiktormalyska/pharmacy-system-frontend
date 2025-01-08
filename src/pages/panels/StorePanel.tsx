import {useEffect, useState} from "react";
import styled from "styled-components";
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";
import {BoughtItemResponse, DrugOrderResponse, DrugResponse, OrderStatus} from "../../values/BackendValues.tsx";
import {useGetAllDrugs} from "../../connection/hooks/useDrug.tsx";
import {usePopover} from "../../components/popover/PopoverContext.tsx";
import {PaymentPopover} from "../../components/popover/popoverImpl/PaymentPopover.tsx";
import {StyledTable} from "../../components/StyledTable.tsx";
import NumberInputWithArrows from "../../components/NumberInputWithArrows.tsx";
import {useAddDrugOrder} from "../../connection/hooks/useDrugsOrders.tsx";

export const StorePanel = () => {
    const [orderItems, setOrderItems] = useState<BoughtItemResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [drugs, setDrugs] =  useState<DrugResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const {data: fetchedDrugs} = useGetAllDrugs()
    const {mutate: addDrugOrder} = useAddDrugOrder()
    const {showPopover} = usePopover()

    useEffect(() => {
        setDrugs(fetchedDrugs)
        setIsLoading(false)
    }, [fetchedDrugs]);

    const addToOrder = (drug: DrugResponse) => {
        setOrderItems((prev) => {
            const amountInCart = orderItems.find(order => order.drug.id === drug.id)?.quantity || 0
            const drugStock = (): number => {
                if (drug.stock === undefined) return 0;
                else return drug.stock;
            };
            if (drugStock() - amountInCart <= 0) {
                console.log("Not enough drug")
                return [...prev]
            }

            const existing = prev.find((boughtItem) => boughtItem.drug.id === drug.id);

            let updatedOrder = [...prev];

            if (existing) {
                updatedOrder = updatedOrder.map((boughtItem) =>
                    boughtItem.drug.id === drug.id
                        ? {
                            ...boughtItem,
                            quantity: boughtItem.quantity + 1,
                            total: (boughtItem.quantity + 1) * drug.price,
                        }
                        : boughtItem
                );
            } else {
                updatedOrder.push({
                    drug: drug,
                    quantity: 1,
                    price: drug.price,
                    id: 0
                });
            }
            return updatedOrder;
        });
    };

    const orderDrug = (drug: DrugResponse) => {
        //TODO: ID zmienić na te z jwt, tak samo z manager
        const drugOrder:DrugOrderResponse = {
            id: 0,
            drugId: drug.id,
            isActive: true,
            orderStatus: OrderStatus.PENDING,
            pharmacistId: 0,
            managerId: 0,
            creationDateTime: new Date(),
            modificationDateTime: new Date(),
            quantity: 1
        }
        addDrugOrder(drugOrder)
    }


    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setOrderItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity,
                        total: newQuantity * item.price,
                    }
                    : item
            )
        );
    };

    const removeFromOrder = (id: number) => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredMedicines = (drugs || []).filter((drug) =>
        drug.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const payment = () => {
        if (orderItems.length != 0)
            showPopover(<PaymentPopover boughtItems={orderItems} />)
        setOrderItems([])
    }
    const handleAmountChange = (id: number | undefined, newAmount: number) => {
        if (id !== undefined) {
            updateQuantity(id, newAmount);
        } else {
            console.warn("ID is undefined. Cannot update quantity.");
        }
    };

    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price*item.quantity, 0);
    if (isLoading) return <>Loading...</>

    const tableHead = (
        <>
            <th>Drug Name</th>
            <th>Quantity</th>
            <th>Price/One</th>
            <th>Total</th>
            <th>Action</th>
        </>
    )


    const tableBody = (
        <>
            {orderItems.map((item) => (
                <tr key={item.id}>
                    <td>{item.drug.name}</td>
                    <td>
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <NumberInputWithArrows
                                max={drugs.find(drug => drug.id === item.drug.id)?.stock || 0}
                                id={item.id}
                                onValueChange={handleAmountChange} />
                        )}
                    </td>
                    <td>{item.price && "zł"}</td>
                    <td>{item.price && item.price*item.quantity && "zł"}</td>
                    <td>
                        <RemoveButton onClick={() => removeFromOrder(item.id)}>Remove</RemoveButton>
                    </td>
                </tr>
            ))}
        </>
    )

    return (
        <BasePanel title="Store panel" panelKey="store">
            <Container>
                <LeftSection>
                        <StyledTable thead={tableHead} tbody={tableBody} />
                </LeftSection>
                <RightSection>
                    <SearchInput
                        type="text"
                        placeholder="Search for medicine"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ScrollableWrapper>
                        <ScrollableArea>
                            {drugs && filteredMedicines.map((drug) => (
                                <MedicineCard key={drug.id}>
                                    <MedicineImage src={drug.image} alt={drug.name} />
                                    <MedicineDetails>
                                        <MedicineName>{drug.name}</MedicineName>
                                    </MedicineDetails>
                                    {/*TODO: Poprawić styl
                                        Jeżeli za mało to order to warehouse
                                        wtedy dodaj od razu drug order z iloscia 1 (manager ustawia potem sobie ilosc)
                                    */}
                                    <InStock>
                                        In Stock: {drugs.find(drugFromBackend => drugFromBackend.id === drug.id)?.stock || 0 - (orderItems.find(item => item.drug.id === drug.id)?.quantity || 0) }
                                    </InStock>
                                    <ActionButtons>
                                        {
                                            (drugs.find(drugFromBackend => drugFromBackend.id === drug.id)?.stock || 0 - (orderItems.find(item => item.drug.id === drug.id)?.quantity || 0)) !== 0
                                                ? (
                                                    <AddButton onClick={() => addToOrder(drug)}>Add to order</AddButton>
                                                )
                                                : (
                                                    <AddButton onClick={() => orderDrug(drug)}>Order Drug</AddButton>
                                                )
                                        }
                                    </ActionButtons>
                                </MedicineCard>
                            ))}
                        </ScrollableArea>
                    </ScrollableWrapper>
                    <SummaryCard>
                        <SummaryContent>
                            <SummaryTexts>
                                <SummaryText>Total items: {totalItems}</SummaryText>
                                <SummaryText>Total price: {totalPrice} zł</SummaryText>
                            </SummaryTexts>
                            <SummaryButtons>
                                <ProceedButton onClick={payment}>Proceed to payment</ProceedButton>
                                <CancelButton onClick={() => setOrderItems([])}>Cancel</CancelButton>
                            </SummaryButtons>
                        </SummaryContent>
                    </SummaryCard>
                </RightSection>
            </Container>
        </BasePanel>
    );
};

const InStock = styled.div`
    background-color: ${colorPalette.button.hex};
    height: 41px;
    padding: 0 1rem;
    border-radius: 10px;
    margin-right: 1rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - 120px);
    overflow: hidden;
    padding: 0;
    margin: 0;
`;


const LeftSection = styled.div`
    width: 60%;
    padding: 1rem;
    box-sizing: border-box;
    height: 100%;
`;


const RightSection = styled.div`
    width: 38%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    gap: 1rem;
`;

const RemoveButton = styled.button`
    background-color: #f44336;
    border: none;
    color: ${colorPalette.text.hex};
    font-size: 15px;
    font-family: "Outfit Regular", sans-serif;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #d32f2f;
    }
`;


const SearchInput = styled.input`
    width: 100%;
    height: 50px;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid ${colorPalette.inputBox.hex};
    background-color: ${colorPalette.inputBox.hex};
    font-size: 16px;
    font-family: "Outfit Regular", sans-serif;
    color: ${colorPalette.darkText.hex};
`;


const ScrollableWrapper = styled.div`
    position: relative;
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
`;


const ScrollableArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1rem;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${colorPalette.background.hex};
        border-radius: 10px;
        border: 3px solid ${colorPalette.background.hex};
    }

    &::-webkit-scrollbar-track {
        background: ${colorPalette.background.hex};
    }

    scrollbar-width: thin;
    scrollbar-color: ${colorPalette.header.hex} ${colorPalette.background.hex};
`;


const MedicineCard = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${colorPalette.header.hex};
    background-color: ${colorPalette.sidebar.hex};
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
    height: 120px;
    box-sizing: border-box;
`;


const MedicineImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;


const MedicineName = styled.h4`
    font-size: 16px;
    font-family: "Outfit Regular", sans-serif;
    color: ${colorPalette.text.hex};
    margin: 0;
    text-align: left;
`;


const MedicineDetails = styled.div`
    flex-grow: 1;
    margin-left: 1rem;
`;


const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`;


const AddButton = styled.button`
    background-color: ${colorPalette.button.hex};
    color: ${colorPalette.text.hex};
    font-size: 14px;
    font-family: "Outfit Medium", sans-serif;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
    }
`;


const SummaryCard = styled.div`
    background-color: ${colorPalette.lightBackground.hex};
    border: 1px solid ${colorPalette.lightBackground.hex};
    border-radius: 10px;
    padding: 0.75rem 1rem;
`;


const SummaryContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const SummaryTexts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
`;

const SummaryText = styled.p`
    margin: 0;
    text-align: left;
    font-size: 16px;
    font-family: "Outfit Regular", sans-serif;
    color: ${colorPalette.darkText.hex};
`;


const SummaryButtons = styled.div`
    display: flex;
    gap: 0.75rem;
`;


const ProceedButton = styled.button`
    background-color: ${colorPalette.button.hex};
    color: ${colorPalette.text.hex};
    font-size: 15px;
    font-family: "Outfit Regular", sans-serif;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
    }
`;


const CancelButton = styled.button`
    background-color: #f44336;
    color: ${colorPalette.text.hex};
    font-size: 15px;
    font-family: "Outfit Regular", sans-serif;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #d32f2f;
    }
`;