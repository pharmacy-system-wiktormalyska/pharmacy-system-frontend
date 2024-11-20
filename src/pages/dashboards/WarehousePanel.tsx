import { useState } from 'react';
import styled from 'styled-components';
import BasePanel from "../../components/BasePanel";
import colorPalette from "../../values/colors.ts";

const WarehousePanel = () => {
    const [activeTab, setActiveTab] = useState<'warehouse' | 'requestList'>('warehouse');

    const warehouseData = [
        { name: 'Medicine A', number: '001', expiry: '2024-12-31', price: '25 zł', details: 'Details about Item 1' },
        { name: 'Medicine B', number: '002', expiry: '2025-06-30', price: '40 zł', details: 'Details about Item 2' },
    ];

    const requestListData = [
        { name: 'Medicine C', pharmacist: 'Jane Doe', quantity: 10 },
        { name: 'Medicine D', pharmacist: 'Ellen Joe', quantity: 5 },
    ];

    return (
        <BasePanel title="Warehouse Panel" panelKey="warehouse">
            <CenteredContainer>
                {}
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

                {}
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
                                    <th>Details</th>
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
                                    <td>{item.details}</td>
                                    <td>
                                        <ActionButton>Order</ActionButton>
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
                                        <RejectButton>Reject</RejectButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </StyledTableContainer>
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


const TabButton = styled.button<{ active: boolean }>`
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