import {useEffect, useState} from "react";
import styled from "styled-components";
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";
import {DrugResponse} from "../../values/BackendValues.tsx";
import {useGetAllDrugs} from "../../connection/hooks/useDrug.tsx";


interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export const StorePanel = () => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    //TODO: add connection to backends interface
    const [drugs, setDrugs] =  useState<DrugResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {data: fetchedDrugs} = useGetAllDrugs()
    useEffect(() => {
        setDrugs(fetchedDrugs)
        setIsLoading(false)
    }, [fetchedDrugs]);

    // const mediczines: MedicineItem[] =

    /*TODO:Dodać fetch dla backend */

    // const medicines: MedicineItem[] = [
    //     { id: 1, name: "Ibuprofen 200mg", price: 15, stock: 50, image: ibuprofenImage },
    //     { id: 2, name: "Paracetamol 500mg", price: 10, stock: 30, image: paracetamolImage },
    //     { id: 3, name: "Acodin Duo", price: 40, stock: 20, image: acodinImage },
    //     { id: 4, name: "Vitamin C 1000mg", price: 5, stock: 100, image: vitamincImage },
    //     { id: 5, name: "Estradiol Valerate", price: 120, stock: 10, image: estradiolImage },
    // ];

    const addToOrder = (drugs: DrugResponse) => {
        setOrderItems((prev) => {
            const existing = prev.find((item) => item.id === drugs.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === drugs.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            total: (item.quantity + 1) * drugs.price,
                        }
                        : item
                );
            }

            return [
                ...prev,
                { id: drugs.id, name: drugs.name, quantity: 1, price: drugs.price, total: drugs.price },
            ];
        });
    };

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


    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderItems.reduce((acc, item) => acc + item.total, 0);
    if (isLoading) return <>Loading...</>
    return (
        <BasePanel title="Store panel" panelKey="store">
            <Container>
                <LeftSection>
                    <TableContainer>
                        <StyledTable>
                            <thead>
                            <tr>
                                <th>Drug Name</th>
                                <th>Quantity</th>
                                <th>Price/One</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        {/*TODO: Użyj tu NumberInputWithArrows*/}
                                        <StyledInput
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                            min="1"
                                        />
                                    </td>
                                    <td>{item.price && "zł"}</td>
                                    <td>{item.price && item.price*item.quantity && "zł"}</td>
                                    <td>
                                        <RemoveButton onClick={() => removeFromOrder(item.id)}>Remove</RemoveButton>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </StyledTable>
                    </TableContainer>
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
                                        Usunąć te które są w koszyku
                                        Jeżeli za mało to order to warehouse
                                        wtedy dodaj od razu drug order z iloscia 1 (manager ustawia potem sobie ilosc)
                                    */}
                                    <ActionButtons>
                                        <AddButton onClick={() => addToOrder(drug)}>Add to order</AddButton>
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
                                <ProceedButton>Proceed to payment</ProceedButton>
                                <CancelButton onClick={() => setOrderItems([])}>Cancel</CancelButton>
                            </SummaryButtons>
                        </SummaryContent>
                    </SummaryCard>
                </RightSection>
            </Container>
        </BasePanel>
    );
};


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


const TableContainer = styled.div`
    margin-top: 0;
    height: 100%;
    overflow-y: auto;
`;


const StyledTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: ${colorPalette.lightBackground.hex};
    border-radius: 10px;
    overflow: hidden;

    th, td {
        padding: 15px;
        text-align: center;
        font-family: "Outfit Regular", sans-serif;
        color: #000;
        border-bottom: 1px solid ${colorPalette.lightBackgroundShadow.hex};
    }

    th {
        background-color: ${colorPalette.lightBackgroundShadow.hex};
        font-size: 16px;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        th, td {
            font-size: 14px;
            padding: 10px;
        }
    }

    @media (max-width: 480px) {
        th, td {
            font-size: 12px;
            padding: 8px;
        }
    }
`;

const StyledInput = styled.input`
    background: transparent;
    border: none;
    width: 60px;
    text-align: center;
    font-size: inherit;
    color: inherit;
    padding: 5px;
    border-radius: 5px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
        background-color: rgba(0, 0, 0, 0.05);
    }
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