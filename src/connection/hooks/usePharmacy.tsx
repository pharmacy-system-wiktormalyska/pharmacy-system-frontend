import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend} from "../fetchBackend.tsx";
import {PharmacyResponse} from "../../values/BackendValues.tsx";

export const useGetAllPharmacies = () => {
    const getAll = APIEndpoints.pharmacy.getAll;
    return useFetchFromBackend("pharmacy", getAll.url, getAll.method);
};

export const useGetPharmacyById = (id: number) => {
    const getById = APIEndpoints.pharmacy.getById(id);
    return useFetchFromBackend(`pharmacy-${id}`, getById.url, getById.method);
};

export const useAddPharmacy = (pharmacy: PharmacyResponse) => {
    const add = APIEndpoints.pharmacy.add;
    return useMutateToBackend("pharmacy-add", add.url, add.method, pharmacy);
};

export const useUpdatePharmacy = (id: number) => {
    const update = APIEndpoints.pharmacy.update(id);
    return useFetchFromBackend(`pharmacy-update-${id}`, update.url, update.method);
};

export const useRemovePharmacy = (id: number) => {
    const remove = APIEndpoints.pharmacy.remove(id);
    return useFetchFromBackend(`pharmacy-remove-${id}`, remove.url, remove.method);
};