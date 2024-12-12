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
enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}