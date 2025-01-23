import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend, usePathParamsToBackend} from "../fetchBackend.tsx";

export const useGetAllPharmacies = () => {
    const getAll = APIEndpoints.pharmacy.getAll;
    return useFetchFromBackend("pharmacy", getAll.url, getAll.method);
};

export const useGetPharmacyById = () => {
    const getById = APIEndpoints.pharmacy.getById;
    return usePathParamsToBackend(`pharmacy`, getById.url, getById.method);
};

export const useAddPharmacy = () => {
    const add = APIEndpoints.pharmacy.add;
    return useMutateToBackend("pharmacy-add", add.url, add.method);
};

export const useUpdatePharmacy = () => {
    const update = APIEndpoints.pharmacy.update;
    return usePathParamsToBackend(`pharmacy-update`, update.url, update.method);
};

export const useRemovePharmacy = () => {
    const remove = APIEndpoints.pharmacy.remove;
    return usePathParamsToBackend(`pharmacy-remove`, remove.url, remove.method);
};