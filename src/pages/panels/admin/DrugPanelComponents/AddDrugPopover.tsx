import styled from "styled-components";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {DrugResponse} from "../../../../values/BackendValues.tsx";
import colorPalette from "../../../../values/colors.ts";
import {usePopover} from "../../../../components/popover/PopoverContext.tsx";
import {useAddDrug} from "../../../../connection/hooks/useDrug.tsx";
import {Checkbox} from "../../../../components/Chechbox.tsx";
import {StyledTable} from "../../../../components/StyledTable.tsx";

interface AddDrugPopoverProps {
    onActionComplete: () => void
}

export const AddDrugPopover = ({onActionComplete}:AddDrugPopoverProps) => {
      const [name, setName] = useState<string | null>(null)
    const [commonName, setCommonName] = useState<string | null>(null)
    const [activeSubstance, setActiveSubstance] = useState<string | null>(null);
    const [marketingAuthorizationHolder, setMarketingAuthorizationHolder] = useState<string | null>(null);
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState<string | null>(null);
    const [maNumber, setMaNumber] = useState<string | null>(null);
    const [atcCode, setAtcCode] = useState<string | null>(null);
    const [strength, setStrength] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [active, setActive] = useState(false)

    const {mutate: addDrug, isSuccess} = useAddDrug()
    const {hidePopover} = usePopover()
    const SubmitDrug = () => {
        if (name && commonName && activeSubstance && marketingAuthorizationHolder && pharmaceuticalForm && maNumber && atcCode && strength && imageUrl) {
            const drug: DrugResponse = {
                id: 0,
                name: name,
                commonName: commonName,
                activeSubstance: activeSubstance,
                marketingAuthorizationHolder: marketingAuthorizationHolder,
                pharmaceuticalForm: pharmaceuticalForm,
                maNumber: maNumber,
                atcCode: atcCode,
                strength: strength,
                relativeImageUrl: imageUrl,
                active: active,
                modificationDateTime: null
            }
            addDrug(drug)
            if (isSuccess) alert("Successfully updated drug!")
            onActionComplete()
            hidePopover()
        }
    }

    const tableHead = () => (
        <>
            <th>Name</th>
            <th>Common Name</th>
            <th>Active Substance</th>
            <th>Marketing Authorization Holder</th>
            <th>Pharmaceutical Form</th>
            <th>MA Number</th>
            <th>ATC Code</th>
            <th>Strength</th>
            <th>Image URL</th>
            <th>Is Active</th>
            <th></th>
        </>
    );

    const tableBody = () =>
    {
        return (
            <tr
                key={0}
            >
                <td>
                    <Form.Control
                        type="text"
                        id="name"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="commonName"
                        value={commonName || ""}
                        onChange={(e) => setCommonName(e.target.value)}
                        placeholder="Common Name"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="activeSubstance"
                        value={activeSubstance || ""}
                        onChange={(e) => setActiveSubstance(e.target.value)}
                        placeholder="Active Substance"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="marketingAuthorizationHolder"
                        value={marketingAuthorizationHolder || ""}
                        onChange={(e) => setMarketingAuthorizationHolder(e.target.value)}
                        placeholder="Marketing Authorization Holder"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="pharmaceuticalForm"
                        value={pharmaceuticalForm || ""}
                        onChange={(e) => setPharmaceuticalForm(e.target.value)}
                        placeholder="Pharmaceutical Form"
                    />
                </td>

                <td>
                    <Form.Control
                        type="text"
                        id="maNumber"
                        value={maNumber || ""}
                        onChange={(e) => setMaNumber(e.target.value)}
                        placeholder="MA Number"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="atcCode"
                        value={atcCode || ""}
                        onChange={(e) => setAtcCode(e.target.value)}
                        placeholder="ATC Code"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="strength"
                        value={strength || ""}
                        onChange={(e) => setStrength(e.target.value)}
                        placeholder="Strength"
                    />
                </td>
                <td>
                    <Form.Control
                        type="text"
                        id="imageUrl"
                        value={imageUrl || ""}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image Url"
                    />
                </td>
                <td>
                    <Checkbox
                            type={"checkbox"}
                            id={`default-checkbox`}
                            checked={active }
                            onChange={(e) => setActive(e.target.checked)}
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
            <DrugInfo>
                <StyledTable thead={tableHead()} tbody={tableBody()}></StyledTable>
            </DrugInfo>
        </Content>
    )
}


const SubmitButton = styled(Button)`
    background-color: ${colorPalette.header.hex};
`

const DrugInfo = styled.div`
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