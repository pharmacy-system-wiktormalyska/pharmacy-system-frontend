import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend, usePathParamsToBackend} from "../fetchBackend.tsx";

export const useGetAllDrugOrders = () => {
    const getAll = APIEndpoints.drugOrders.getAll;
    return useFetchFromBackend("drugOrders", getAll.url, getAll.method);
};

export const useGetDrugOrderById = () => {
    const getById = APIEndpoints.drugOrders.getById();
    return usePathParamsToBackend(`drugOrders`, getById.url, getById.method);
};

export const useAddDrugOrder = () => {
    const add = APIEndpoints.drugOrders.add;
    return useMutateToBackend("drugOrders-add", add.url, add.method);
};

export const useUpdateDrugOrder = () => {
    const update = APIEndpoints.drugOrders.update();
    return useMutateToBackend(`drugOrders-update`, update.url, update.method);
};

export const useRemoveDrugOrder = () => {
    const remove = APIEndpoints.drugOrders.remove();
    return usePathParamsToBackend(`drugOrders-remove`, remove.url, remove.method);
};
