import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend} from "../fetchBackend.tsx";

//TODO: Zrobić tak dla reszty

export const useGetAllDrugOrders = () => {
    const getAll = APIEndpoints.drugOrders.getAll;
    return useFetchFromBackend("drugOrders", getAll.url, getAll.method);
};

export const useGetDrugOrderById = (id: number) => {
    const getById = APIEndpoints.drugOrders.getById(id);
    return useFetchFromBackend(`drugOrders-${id}`, getById.url, getById.method);
};

export const useAddDrugOrder = () => {
    const add = APIEndpoints.drugOrders.add;
    return useFetchFromBackend("drugOrders-add", add.url, add.method);
};

export const useUpdateDrugOrder = (id: number) => {
    const update = APIEndpoints.drugOrders.update(id);
    return useFetchFromBackend(`drugOrders-update-${id}`, update.url, update.method);
};

export const useRemoveDrugOrder = (id: number) => {
    const remove = APIEndpoints.drugOrders.remove(id);
    return useFetchFromBackend(`drugOrders-remove-${id}`, remove.url, remove.method);
};
