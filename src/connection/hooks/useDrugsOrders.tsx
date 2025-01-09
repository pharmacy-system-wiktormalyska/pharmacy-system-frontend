import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend} from "../fetchBackend.tsx";
import {DrugOrderResponse} from "../../values/BackendValues.tsx";

export const useGetAllDrugOrders = () => {
    const getAll = APIEndpoints.drugOrders.getAll;
    return useFetchFromBackend("drugOrders", getAll.url, getAll.method);
};

export const useGetDrugOrderById = (id: number) => {
    const getById = APIEndpoints.drugOrders.getById(id);
    return useFetchFromBackend(`drugOrders-${id}`, getById.url, getById.method);
};

export const useAddDrugOrder = (drugOrder?:DrugOrderResponse) => {
    const add = APIEndpoints.drugOrders.add;
    return useMutateToBackend("drugOrders-add", add.url, add.method, drugOrder || {});
};

export const useUpdateDrugOrder = (id: number) => {
    const update = APIEndpoints.drugOrders.update(id);
    return useFetchFromBackend(`drugOrders-update-${id}`, update.url, update.method);
};

export const useRemoveDrugOrder = (id: number) => {
    const remove = APIEndpoints.drugOrders.remove(id);
    return useFetchFromBackend(`drugOrders-remove-${id}`, remove.url, remove.method);
};
