export const url = "https://backend.pharmacy.wiktormalyska.ovh/";

// export const url = "http://localhost:8080";
export interface DrugOrderResponse {
    id: number
    warehouseId: number
    drugId: number
    quantity: number
    pharmacistId: number
    managerId: number
    orderStatus: OrderStatus
    creationDateTime: Date
    modificationDateTime: Date
    completionDateTime: Date | null
    isActive: boolean | null
}
export enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

export interface DrugResponse {
    id: number;
    name: string;
    commonName: string;
    activeSubstance: string;
    marketingAuthorizationHolder: string;
    pharmaceuticalForm: string;
    maNumber: string;
    atcCode: string;
    strength: string;
    relativeImageUrl: string;
}

export interface ManagerResponse {
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
}

export interface OrderItemResponse {
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

export interface OrderResponse {
  id: number;
  pharmacyId: number;
  pharmacistId: number;
  itemsInOrder: OrderItemResponse[];
  orderStatus: OrderStatus;
  creationDateTime: Date;
  modificationDateTime: Date;
}

export interface AdministratorResponse {
    id: number;
    name: string;
    username: string;
    surname: string;
    pesel: string;
    familyName: string;
    placeOfBirth: string;
    dateOfBirth: string; // Use string if the date is in ISO format, otherwise use Date
    nationality: string;
    address: string;
    correspondenceAddress: string;
    fathersName: string;
    mothersName: string;
    education: string;
    creationDateTime?: string; // Optional field
    modificationDateTime?: string; // Optional field
    password: string;
    isActive: boolean;
    role: string;
}