import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, usePathParamsToBackend} from "../fetchBackend.tsx";

export const useGetAllWarehouses = () => {
    const getAll = APIEndpoints.warehouse.getAll
    return useFetchFromBackend("warehouse", getAll.url, getAll.method)
}

export const useGetWarehouseById = () => {
    const getById = APIEndpoints.warehouse.getById
    return usePathParamsToBackend("warehouse", getById.url, getById.method)
}