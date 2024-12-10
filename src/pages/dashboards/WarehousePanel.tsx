import { useState } from 'react';
import styled from 'styled-components';
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";
import { AiOutlineClose } from 'react-icons/ai';

interface WarehouseItem {
    name: string;
    number: string;
    expiry: string;
    price: string;
    stock: number;
    description: string;
}

interface RequestItem {
    name: string;
    pharmacist: string;
    quantity: number;
    stock: number;
    description: string;
}

const WarehousePanel = () => {
    const [activeTab, setActiveTab] = useState<'warehouse' | 'requestList'>('warehouse');
    const [selectedDetails, setSelectedDetails] = useState<WarehouseItem | RequestItem | null>(null);

    const warehouseData: WarehouseItem[] = [
        { name: 'Estradiol Valerate', number: 'EV001', expiry: '2025-08-15', price: '120 zł', stock: 200, description: 'A long-acting estrogen used in feminizing hormone replacement therapy :3' },
        { name: 'Ibuprofen 400mg', number: 'IB002', expiry: '2026-01-10', price: '15 zł', stock: 500, description: 'A common pain reliever used to treat inflammation, headaches, and minor aches' },
    ];

    const requestListData: RequestItem[] = [
        { name: 'Paracetamol 500mg', pharmacist: 'Eula Lawrence', quantity: 10, stock: 50, description: 'Widely used for relieving mild to moderate pain and reducing fever' },
        { name: 'Metformin 500mg', pharmacist: 'Miracle Johnson', quantity: 5, stock: 85, description: 'Used to manage type 2 diabetes by controlling blood sugar levels' },
    ];

    const openDetails = (item: WarehouseItem | RequestItem) => setSelectedDetails(item);
    const closeDetails = () => setSelectedDetails(null);

    return (
        <BasePanel title="Warehouse Panel" panelKey="warehouse">
            <CenteredContainer>
                <ButtonGroup>
                    <TabButton
                        active={activeTab === 'warehouse'}
                        onClick={() => setActiveTab('warehouse')}
                    >
                        Order by Warehouse
                    </TabButton>
                    <TabButton
                        active={activeTab === 'requestList'}
                        onClick={() => setActiveTab('requestList')}
                    >
                        Order by Request List
                    </TabButton>
                </ButtonGroup>

                <StyledTableContainer>
                    <StyledTable>
                        <thead>
                        <tr>
                            {activeTab === 'warehouse' && (
                                <>
                                    <th>Name</th>
                                    <th>Number</th>
                                    <th>Expiry Date</th>
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
                        </tr>
                        </thead>
                        <tbody>
                        {activeTab === 'warehouse' &&
                            warehouseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td>{item.expiry}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <ActionButton>Order</ActionButton>
                                        <DetailsButton onClick={() => openDetails(item)}>Details</DetailsButton>
                                    </td>
                                </tr>
                            ))}
                        {activeTab === 'requestList' &&
                            requestListData.map((request, index) => (
                                <tr key={index}>
                                    <td>{request.name}</td>
                                    <td>{request.pharmacist}</td>
                                    <td>{request.quantity}</td>
                                    <td>
                                        <ActionButton>Order</ActionButton>
                                        <RejectButton onClick={() => alert(`Request for ${request.name} rejected.`)}>Reject</RejectButton>
                                        <DetailsButton onClick={() => openDetails(request)}>Details</DetailsButton>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </StyledTable>
                </StyledTableContainer>

                {selectedDetails && (
                    <PopupOverlay onClick={closeDetails}>
                        <PopupContainer onClick={(e) => e.stopPropagation()}>
                            <PopupHeader>
                                <CloseButton onClick={closeDetails}>
                                    <AiOutlineClose />
                                </CloseButton>
                            </PopupHeader>
                            <PopupContent>
                                <h3>{selectedDetails.name}</h3>
                                <p>
                                    <strong>Stock</strong>
                                    {selectedDetails.stock}
                                </p>
                                <p>
                                    <strong>Description</strong>
                                    {selectedDetails.description}
                                </p>
                            </PopupContent>
                        </PopupContainer>
                    </PopupOverlay>
                )}
            </CenteredContainer>
        </BasePanel>
    );
};

export default WarehousePanel;


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


const StyledTableContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    overflow-x: auto;
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


const TabButton = styled.button<{ active?: boolean | false}>`
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