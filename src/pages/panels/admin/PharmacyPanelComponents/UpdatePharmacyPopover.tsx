import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { PharmacyResponse } from "../../../../values/BackendValues.tsx";
import { StyledTable } from "../../../../components/StyledTable.tsx";
import colorPalette from "../../../../values/colors.ts";
import { useUpdatePharmacy } from "../../../../connection/hooks/usePharmacy.tsx";
import { usePopover } from "../../../../components/popover/PopoverContext.tsx";

interface UpdatePharmacyPopoverProps {
    onActionComplete: () => void;
    pharmacyResponse: PharmacyResponse;
}

export const UpdatePharmacyPopover = ({ pharmacyResponse, onActionComplete }: UpdatePharmacyPopoverProps) => {
    const [name, setName] = useState(pharmacyResponse.name || "");
    const [address, setAddress] = useState(pharmacyResponse.address || "");
    const [type, setType] = useState(pharmacyResponse.type || "");
    const [owner, setOwner] = useState(pharmacyResponse.owner || "");
    const [phone, setPhone] = useState(pharmacyResponse.phone || "");
    const [email, setEmail] = useState(pharmacyResponse.email || "");
    const [website, setWebsite] = useState(pharmacyResponse.website || "");

    const { data: updatePharmacy } = useUpdatePharmacy();
    const { hidePopover } = usePopover();

    const submitPharmacy = () => {
        const pharmacy: PharmacyResponse = {
            id: pharmacyResponse.id,
            pharmacyId: pharmacyResponse.pharmacyId,
            name: name,
            address: address,
            type: type,
            owner: owner,
            phone: phone,
            email: email,
            website: website
        };
        updatePharmacy(pharmacy);
        onActionComplete();
        hidePopover();
    };

    const tableHead = () => (
        <>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th></th>
        </>
    );

    const tableBody = () => {
        if (pharmacyResponse === null) return null;
        return (
            <tr key={pharmacyResponse.id}>
                <td>{pharmacyResponse.id}</td>
                <td>
                    <Form.Control
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Type"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="Owner"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website"
                    />
                </td>
                <td>
                    <SubmitButton onClick={submitPharmacy}>Submit</SubmitButton>
                </td>
            </tr>
        );
    };

    return (
        <Content>
            <Title>Update Pharmacy</Title>
            <PharmacyInfo>
                <StyledTable thead={tableHead()} tbody={tableBody()} />
            </PharmacyInfo>
        </Content>
    );
};

const SubmitButton = styled(Button)`
    background-color: ${colorPalette.header.hex};
`;

const PharmacyInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 100%;
    padding-top: 2rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
`;

const Title = styled.div`
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
`;