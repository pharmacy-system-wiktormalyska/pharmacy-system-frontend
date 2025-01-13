import styled from "styled-components";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {
    DrugResponse,
} from "../../../../values/BackendValues.tsx";
import {StyledTable} from "../../../../components/StyledTable.tsx";
import colorPalette from "../../../../values/colors.ts";
import {useAddDrug} from "../../../../connection/hooks/useDrug.tsx";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
export const UpdateDrugPopover = ({drugResponse}: {drugResponse : DrugResponse}) => {
    const [name, setName] = useState(drugResponse.name)
    const [commonName, setCommonName] = useState(drugResponse.commonName)
    const [activeSubstance, setActiveSubstance] = useState(drugResponse.activeSubstance);
    const [marketingAuthorizationHolder, setMarketingAuthorizationHolder] = useState(drugResponse.marketingAuthorizationHolder);
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState(drugResponse.pharmaceuticalForm);
    const [maNumber, setMaNumber] = useState(drugResponse.maNumber);
    const [atcCode, setAtcCode] = useState(drugResponse.atcCode);
    const [strength, setStrength] = useState(drugResponse.strength);
    const [imageUrl, setImageUrl] = useState(drugResponse.relativeImageUrl);

    const {mutate: addDrug} = useAddDrug()
    const {hidePopover} = usePopover()
//TODO: zobaczyć czy działa
    const SubmitDrug = () => {
        const drug: DrugResponse = {
            id: drugResponse.id,
            name: name,
            commonName: commonName,
            activeSubstance: activeSubstance,
            marketingAuthorizationHolder: marketingAuthorizationHolder,
            pharmaceuticalForm: pharmaceuticalForm,
            maNumber: maNumber,
            atcCode: atcCode,
            strength: strength,
            relativeImageUrl: imageUrl
        }
        addDrug(drug)
        hidePopover()
    }

    const tableHead = () => (
        <>
            <th>ID</th>
            <th>Name</th>
            <th>Common Name</th>
            <th>Active Substance</th>
            <th>Marketing Authorization Holder</th>
            <th>Pharmaceutical Form</th>
            <th>MA Number</th>
            <th>ATC Code</th>
            <th>Strength</th>
            <th>Image URL</th>
            <th></th>
        </>
    );

    const tableBody = () =>
    {
        if (drugResponse === null) return null
        return (
            <tr
                key={drugResponse.id}
            >
                <td>{drugResponse.id}</td>
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
                        id="commonName"
                        value={commonName}
                        onChange={(e) => setCommonName(e.target.value)}
                        placeholder="Common Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="activeSubstance"
                        value={activeSubstance}
                        onChange={(e) => setActiveSubstance(e.target.value)}
                        placeholder="Active Substance"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="marketingAuthorizationHolder"
                        value={marketingAuthorizationHolder}
                        onChange={(e) => setMarketingAuthorizationHolder(e.target.value)}
                        placeholder="Marketing Authorization Holder"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="pharmaceuticalForm"
                        value={pharmaceuticalForm}
                        onChange={(e) => setPharmaceuticalForm(e.target.value)}
                        placeholder="Pharmaceutical Form"
                    />
                </td>

                <td>
                    <Form.Control
                        type="text"
                        id="maNumber"
                        value={maNumber}
                        onChange={(e) => setMaNumber(e.target.value)}
                        placeholder="MA Number"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="atcCode"
                        value={atcCode}
                        onChange={(e) => setAtcCode(e.target.value)}
                        placeholder="ATC Code"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="strength"
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                        placeholder="Strength"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image Url"
                    />
                </td>
                <td>
                    <SubmitButton onClick={SubmitDrug}>Submit</SubmitButton>
                </td>
            </tr>
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

const SubmitButton = styled(Button)`
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