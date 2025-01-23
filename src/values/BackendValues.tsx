export const url = "https://backend.pharmacy.wiktormalyska.ovh/";

// export const url = "http://localhost:8080";
export interface DrugOrderResponse {
    id?: number|null;
    warehouseId: number
    drugId: number
    quantity: number
    pharmacistId: number
    managerId: number
    orderStatus: OrderStatus
    creationDateTime: Date
    modificationDateTime: Date
    completionDateTime: Date | null

}
export enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

export enum PharmacyType {
    APTEKA_OGOLNODOSTEPNA,
    PUNKT_APTECZNY,
    APTEKA_SZPITALNA,
    APTEKA_ZAKLADOWA,
    DZIAL_FARMACJI_SZPITALNEJ,
    APTEKA_SZPITALNA_BEZ_ZGODY,
    APTEKA_ZAKLADOWA_MON,
    APTEKA_ZAKLADOWA_MON_BEZ_ZGODY,
    DZIAL_FARMACJI_SZPITALNEJ_MON,
    APTEKA_ZAKLADOWA_BEZ_ZGODY
}

export interface DrugResponse {
    id?: number|null;
    name: string;
    commonName: string;
    activeSubstance: string;
    marketingAuthorizationHolder: string;
    pharmaceuticalForm: string;
    maNumber: string;
    atcCode: string;
    strength: string;
    relativeImageUrl: string;
    modificationDateTime: Date | null
    active: boolean | true
}

export interface ManagerResponse {
    id?: number;
    name: string;
    username: string;
    surname: string;
    pesel: string;
    familyName: string;
    placeOfBirth: string;
    dateOfBirth: Date;
    nationality: string;
    address: string;
    correspondenceAddress: string;
    fathersName: string;
    mothersName: string;
    education: string;
    pharmacyId?: string;
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
    type: PharmacyType;
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

export interface WarehouseResponse {
    id: number;
    stock: WarehouseItemResponse[];
    managerId: number;
    pharmacyIds: number[];
    drugOrderIds: number[];
}
export interface WarehouseItemResponse {
    id: number;
    warehouseId: number;
    drugId: number;
    priceInCents: number;
    quantity: number;
}