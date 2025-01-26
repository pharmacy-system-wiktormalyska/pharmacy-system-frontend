import {useEffect, useState} from "react";
import styled from "styled-components";
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";
import {OrderItemResponse, DrugResponse, WarehouseResponse, WarehouseItemResponse, url} from "../../values/BackendValues.tsx";
import {useGetAllDrugs} from "../../connection/hooks/useDrug.tsx";
import {StyledTable} from "../../components/StyledTable.tsx";
import NumberInputWithArrows from "../../components/NumberInputWithArrows.tsx";
import {useGetAllWarehouses} from "../../connection/hooks/useWarehouse.tsx";

export const StorePanel = () => {
    const [orderItems, setOrderItems] = useState<OrderItemResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [drugs, setDrugs] = useState<DrugResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showSentPopup, setShowSentPopup] = useState(false)

    const {data: fetchedDrugs} = useGetAllDrugs()
    const {data: fetchedWarehouses} = useGetAllWarehouses()

    useEffect(() => {
        if (fetchedDrugs) {
            setDrugs(fetchedDrugs)
            setIsLoading(false)
        }
    }, [fetchedDrugs]);

    const getAvailableStock = (drugId: number): number => {
        if (!fetchedWarehouses?.length) return 0;

        const warehouseStock = fetchedWarehouses.flatMap((warehouse: WarehouseResponse) =>
            warehouse.stock.filter((item: WarehouseItemResponse) => item.drugId === drugId)
        );

        return warehouseStock.reduce((total: number, item: WarehouseItemResponse) => total + item.quantity, 0);
    };

    const addToOrder = (drug: DrugResponse) => {
        setOrderItems((prev) => {
            const availableStock = getAvailableStock(drug.id || 0);
            const existingItem = prev.find((order) => order.drug.id === drug.id);

            if (existingItem) {
                alert("This item is already in the cart");
                return prev;
            }

            if (availableStock <= 0) {
                alert("Not enough stock");
                return prev;
            }

            return [
                ...prev,
                {
                    drug: drug,
                    quantity: 1,
                    price: 50, // todo mocked cena bo nie ma w DrugResponse
                    id: prev.length + 1,
                },
            ];
        });
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        setOrderItems((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    const availableStock = getAvailableStock(item.drug.id || 0);

                    if (newQuantity > availableStock) {
                        alert("Not enough stock available");
                        return item;
                    }

                    if (newQuantity <= 0) {
                        alert("Quantity must be at least 1");
                        return item;
                    }

                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });
        });
    };

    const removeFromOrder = (id: number) => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredMedicines = (drugs || []).filter((drug) =>
        drug.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAmountChange = (newAmount: number, id: number | undefined) => {
        if (id !== undefined) {
            updateQuantity(id, newAmount);
        }
    };

    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const payment = () => {
        setShowSentPopup(true);
        setOrderItems([]);
    };

    if (isLoading) return <>Loading...</>;

    const tableHead = (
        <>
            <th>Drug Name</th>
            <th>Quantity</th>
            <th>Price/One</th>
            <th>Total</th>
            <th>Action</th>
        </>
    );

    const tableBody = (
        <>
            {orderItems.map((item) => (
                <tr key={item.id}>
                    <td>{item.drug.name}</td>
                    <td>
                        <NumberInputWithArrows
                            max={getAvailableStock(item.drug.id || 0)}
                            id={item.id}
                            onValueChange={handleAmountChange}
                            base_amount={item.quantity}
                        />
                    </td>
                    <td>{item.price.toFixed(2)} zł</td>
                    <td>{(item.price * item.quantity).toFixed(2)} zł</td>
                    <td>
                        <RemoveButton onClick={() => removeFromOrder(item.id)}>Remove</RemoveButton>
                    </td>
                </tr>
            ))}
        </>
    );

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
                            {filteredMedicines.map((drug) => {
                                const availableStock = getAvailableStock(drug.id || 0);
                                const inCartQuantity = orderItems.find(item => item.drug.id === drug.id)?.quantity || 0;
                                const remainingStock = availableStock - inCartQuantity;

                                return (
                                    <MedicineCard key={drug.id}>
                                        <MedicineImage src={url+"static/"+drug.relativeImageUrl} alt={drug.name} />
                                        <MedicineDetails>
                                            <MedicineName>{drug.name}</MedicineName>
                                        </MedicineDetails>
                                        <InStock style={{backgroundColor: remainingStock > 0 ? colorPalette.button.hex : "red"}}>
                                            In Stock: {remainingStock}
                                        </InStock>
                                        <ActionButtons>
                                            {remainingStock > 0 ? (
                                                <AddButton onClick={() => addToOrder(drug)}>Add</AddButton>
                                            ) : (
                                                <AddButton disabled>Out of Stock</AddButton>
                                            )}
                                        </ActionButtons>
                                    </MedicineCard>
                                );
                            })}
                        </ScrollableArea>
                    </ScrollableWrapper>
                    <SummaryCard>
                        <SummaryContent>
                            <SummaryTexts>
                                <SummaryText>Total items: {totalItems}</SummaryText>
                                <SummaryText>Total price: {totalPrice.toFixed(2)} zł</SummaryText>
                            </SummaryTexts>
                            <SummaryButtons>
                                <ProceedButton
                                    onClick={payment}
                                    disabled={orderItems.length === 0}
                                >
                                    Proceed to payment
                                </ProceedButton>
                                <CancelButton onClick={() => setOrderItems([])}>Cancel</CancelButton>
                            </SummaryButtons>
                        </SummaryContent>
                    </SummaryCard>
                </RightSection>
            </Container>

            {showSentPopup && (
                <PopupOverlay onClick={() => setShowSentPopup(false)}>
                    <PopupContainer onClick={(e) => e.stopPropagation()}>
                        <PopupContent>
                            <h2>Sent</h2>
                        </PopupContent>
                    </PopupContainer>
                </PopupOverlay>
            )}
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

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContainer = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
`;

const PopupContent = styled.div`
    h2 {
        color: ${colorPalette.darkText.hex};
        margin: 0;
    }
`;