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

const PrescriptionPanel = () => {
    const [patientName, setPatientName] = useState('');
    const [pesel, setPesel] = useState('');
    const [medicine, setMedicine] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [dose, setDose] = useState('');
    const [medForm, setMedForm] = useState('');
    const [prescriptionDate, setPrescriptionDate] = useState('');
    const [realizationDate, setRealizationDate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pharmacist, setPharmacist] = useState('');
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [prescriptionNumber, setPrescriptionNumber] = useState('');

    const warehouseData: WarehouseItem[] = [
        { name: 'Estradiol Valerate', number: 'EV001', expiry: '2025-08-15', price: '120 zł', stock: 200, description: 'A long-acting estrogen used in feminizing hormone replacement therapy' },
        { name: 'Ibuprofen 400mg', number: 'IB002', expiry: '2026-01-10', price: '15 zł', stock: 500, description: 'A common pain reliever used to treat inflammation, headaches, and minor aches' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderSubmitted(true);
    };

    return (
        <BasePanel title="Prescription panel" panelKey="prescription">
            <CenteredContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <FormColumn>
                        <FieldContainer>
                            <Label>Patient Name:</Label>
                            <Input
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>PESEL:</Label>
                            <Input
                                type="text"
                                value={pesel}
                                onChange={(e) => setPesel(e.target.value)}
                                maxLength={11}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Prescription Number:</Label>
                            <Input
                                type="text"
                                value={prescriptionNumber}
                                onChange={(e) => setPrescriptionNumber(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Medicine:</Label>
                            <Select
                                value={medicine}
                                onChange={(e) => setMedicine(e.target.value)}
                                required
                            >
                                <option value="">Select Medicine</option>
                                {warehouseData.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </Select>
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Quantity:</Label>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                min="1"
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Dose:</Label>
                            <Input
                                type="text"
                                value={dose}
                                onChange={(e) => setDose(e.target.value)}
                                required
                            />
                        </FieldContainer>

                    </FormColumn>
                    <FormColumn>
                        <FieldContainer>
                            <Label>Form of Medicine:</Label>
                            <Input
                                type="text"
                                value={medForm}
                                onChange={(e) => setMedForm(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Prescription Date:</Label>
                            <Input
                                type="date"
                                value={prescriptionDate}
                                onChange={(e) => setPrescriptionDate(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Realization Date:</Label>
                            <Input
                                type="date"
                                value={realizationDate}
                                onChange={(e) => setRealizationDate(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Address:</Label>
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Phone Number:</Label>
                            <Input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Label>Pharmacist Name:</Label>
                            <Input
                                type="text"
                                value={pharmacist}
                                onChange={(e) => setPharmacist(e.target.value)}
                                required
                            />
                        </FieldContainer>
                    </FormColumn>

                    <SubmitButton type="submit">Submit Order</SubmitButton>
                </FormContainer>

                {orderSubmitted && (
                    <PopupOverlay>
                        <PopupContainer>
                            <PopupHeader>
                                <CloseButton onClick={() => setOrderSubmitted(false)}>
                                    <AiOutlineClose />
                                </CloseButton>
                            </PopupHeader>
                            <ScrollableContent>
                                <PopupContent>
                                    <h3>Order Submitted</h3>
                                    <p><strong>Patient:</strong> {patientName}</p>
                                    <p><strong>PESEL:</strong> {pesel}</p>
                                    <p><strong>Prescription Number:</strong> {prescriptionNumber}</p>
                                    <p><strong>Medicine:</strong> {medicine}</p>
                                    <p><strong>Quantity:</strong> {quantity}</p>
                                    <p><strong>Dose:</strong> {dose}</p>
                                    <p><strong>Form of Medicine:</strong> {medForm}</p>
                                    <p><strong>Prescription Date:</strong> {prescriptionDate}</p>
                                    <p><strong>Realization Date:</strong> {realizationDate}</p>
                                    <p><strong>Address:</strong> {address}</p>
                                    <p><strong>Phone Number:</strong> {phone}</p>
                                    <p><strong>Pharmacist:</strong> {pharmacist}</p>
                                </PopupContent>
                            </ScrollableContent>
                        </PopupContainer>
                    </PopupOverlay>
                )}
            </CenteredContainer>
        </BasePanel>
    );
};

export default PrescriptionPanel;

const FormContainer = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
    height: auto;
    padding: 25px;
    background-color: ${colorPalette.lightBackground.hex};
    border-radius: 10px;
    gap: 20px;
    flex-wrap: wrap;
`;


const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 15px;
`;


const SubmitButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Outfit Medium", sans-serif;
    align-self: self-end;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;


const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    padding: 10px;
`;


const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`;


const Label = styled.label`
    font-size: 14px;
    font-family: "Outfit Medium", sans-serif;
    color: ${colorPalette.darkText.hex};
    text-align: left;
`;


const Input = styled.input`
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid ${colorPalette.inputBox.hex};
    background-color: ${colorPalette.inputBox.hex};
    font-size: 14px;
    font-family: "Outfit Regular", sans-serif;
    color: ${colorPalette.darkText.hex};
`;


const Select = styled.select`
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid ${colorPalette.inputBox.hex};
    background-color: ${colorPalette.inputBox.hex};
    font-size: 14px;
    font-family: "Outfit Regular", sans-serif;
    color: ${colorPalette.darkText.hex};
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
    border-radius: 10px;
    width: 400px;
    padding: 25px 30px 25px 35px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;


const ScrollableContent = styled.div`
    max-height: 70vh;
    margin-top: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: ${colorPalette.lightBackgroundShadow.hex} ${colorPalette.windowBackground.hex};

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${colorPalette.lightBackgroundShadow.hex};
        border-radius: 10px;
        border: 3px solid ${colorPalette.windowBackground.hex};
    }

    &::-webkit-scrollbar-track {
        background: ${colorPalette.windowBackground.hex};
    }
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
    margin-top: 30px;

    h3 {
        font-size: 24px;
        font-family: "Outfit Medium", sans-serif;
        margin-bottom: 30px;
        text-align: center;
    }

    p {
        margin-bottom: 15px; 
        text-align: left;
        font-size: 16px;
        font-family: "Outfit Light", sans-serif;
    }

    p strong {
        display: block;
        margin-bottom: 5px;
        font-size: 16px;
        font-family: "Outfit Regular", sans-serif;
    }
`;