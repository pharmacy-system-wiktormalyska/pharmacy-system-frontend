export const url = "https://backend.pharmacy.wiktormalyska.ovh/";

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
    price: number;
    stock: number;
    relativeImageUrl: string;
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

export interface PharmacistResponse {
    id: number;
    name: string;
    surname: string;
    familyName: string;
    placeOfBirth: string;
    dateOfBirth: Date;
    nationality: string;
    address: string;
    correspondenceAddress: string;
    fathersName: string;
    mothersName: string;
    education: string;
    pharmacyId: number;
    managerId: number;
}

export interface BoughtItemResponse {
    id: number;
    drug: DrugResponse
    quantity: number;
    price: number;
}


export interface PharmacyResponse {
    id: number;
    pharmacyId: number;
    name: string;
    address: string;
    type: 'APTEKA_OGOLNODOSTEPNA';
    owner: string;
    phone: string;
    email: string;
    website: string;
}
