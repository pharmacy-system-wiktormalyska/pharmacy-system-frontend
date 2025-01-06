export const url = "https://backend.pharmacy.wiktormalyska.ovh";

// export const url = "http://localhost:8080";
export interface DrugOrderResponse {
    id: number
    drugId: number
    quantity: number
    pharmacistId: number
    managerId: number
    orderStatus: OrderStatus
    creationDateTime: Date
    modificationDateTime: Date
    isActive: boolean
}
export enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

export interface DrugResponse {
    id: number;
    name: string;
    activeSubstance: string;
    atcCode: string;
    commonName: string;
    maNumber: string;
    marketingAuthorizationHolder: string;
    pharmaceuticalForm: string;
    strength: string;
    active: boolean;
    modificationDateTime: Date;
}

export interface ManagerResponse {
    id: number;
    name: string;
    surname: string;
    familyName: string;
    placeOfBirth: string;
    dateOfBirth: string;
    nationality: string;
    address: string;
    correspondenceAddress: string;
    fathersName: string;
    mothersName: string;
    education: string;
    pharmacyIds: number[];
}