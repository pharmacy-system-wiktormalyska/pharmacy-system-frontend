import styled from "styled-components";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import colorPalette from "../../../../values/colors.ts";
import {useAddManager} from "../../../../connection/hooks/useManagers.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {useGetAllPharmacies} from "../../../../connection/hooks/usePharmacy.tsx";
import {StyledTable2Rowed} from "../../../../components/StyledTable2Rowed.tsx";
import {ManagerResponse} from "../../../../values/BackendValues.tsx";

interface AddManagerPopoverProps {
    onActionComplete: () => void
}

export const AddManagerPopover = ({onActionComplete}:AddManagerPopoverProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const {data: fetchedPharmacies} = useGetAllPharmacies()

    const {mutate: addManager} = useAddManager()

    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [pesel, setPesel] = useState<string>('');
    const [familyName, setFamilyName] = useState<string>('');
    const [placeOfBirth, setPlaceOfBirth] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [nationality, setNationality] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [correspondenceAddress, setCorrespondenceAddress] = useState<string>('');
    const [fathersName, setFathersName] = useState<string>('');
    const [mothersName, setMothersName] = useState<string>('');
    const [education, setEducation] = useState<string>('');

    const {hidePopover} = usePopover()

    useEffect(() => {
        setIsLoading(false)
    }, [fetchedPharmacies]);

    const SubmitManager = () => {
        if (!dateOfBirth) {
            console.error("Date of birth is required");
            return;
        }
        const submitRequest:ManagerResponse = {
            name: name,
            username: username,
            surname: surname,
            pesel: pesel,
            familyName: familyName,
            placeOfBirth: placeOfBirth,
            dateOfBirth: dateOfBirth,
            nationality: nationality,
            address: address,
            correspondenceAddress: correspondenceAddress,
            fathersName: fathersName,
            mothersName: mothersName,
            education: education
        }
        addManager(submitRequest)
        onActionComplete()
        hidePopover()
    }


    const tableHead1 = () => (
        <>
            <th>Manager Name</th>
            <th>Username</th>
            <th>Manager Surname</th>
            <th>Pesel</th>
            <th>Family Name</th>
            <th>Place of Birth</th>
            <th>Date of Birth</th>

        </>
    )

    const tableHead2 = () => (
        <>
            <th>Nationality</th>
            <th>Address</th>
            <th>Correspondence Address</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Education</th>
            <th></th>
        </>
    )

    const tableBody1 = () => {
        if (isLoading) return (
            <>
                <tr>
                    <td>Loading...</td>
                </tr>
            </>
        );

        return (
            <>
                <tr>
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
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            placeholder="Surname"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            id="pesel"
                            value={pesel}
                            onChange={(e) => setPesel(e.target.value)}
                            placeholder="Pesel"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            id="familyName"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                            placeholder="Family Name"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            id="placeOfBirth"
                            value={placeOfBirth}
                            onChange={(e) => setPlaceOfBirth(e.target.value)}
                            placeholder="Place of Birth"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""}
                            onChange={(e) => {
                                const inputDate = e.target.value; // YYYY-MM-DD format
                                setDateOfBirth(inputDate ? new Date(inputDate) : null);
                            }}
                        />
                    </td>
                </tr>
            </>
        );
    };

    const tableBody2 = () => {
        return (
            <>
                <td>
                    <Form.Control
                        type="text"
                        id="nationality"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Nationality"
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
                        id="correspondenceAddress"
                        value={correspondenceAddress}
                        onChange={(e) => setCorrespondenceAddress(e.target.value)}
                        placeholder="Correspondence Address"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="fathersName"
                        value={fathersName}
                        onChange={(e) => setFathersName(e.target.value)}
                        placeholder="Father's Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="mothersName"
                        value={mothersName}
                        onChange={(e) => setMothersName(e.target.value)}
                        placeholder="Mother's Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder="Education"
                    />
                </td>
                <td>
                    <SubmitButton onClick={SubmitManager}>Submit</SubmitButton>
                </td>
            </>
        )
    }


    return (
        <Content>
            <Title>Add Manager</Title>
            <ManagerInfo>
                <StyledTable2Rowed thead1={tableHead1()} tbody1={tableBody1()} thead2={tableHead2()}
                                   tbody2={tableBody2()}></StyledTable2Rowed>
            </ManagerInfo>
        </Content>
    )
}


const SubmitButton = styled(Button)`
    background-color: ${colorPalette.header.hex};
`

const ManagerInfo = styled.div`
    display: flex;
    flex-direction: column;
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