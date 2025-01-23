import { APIEndpoints } from "../Endpoints";
import {useFetchFromBackend, useMutateToBackend, usePathParamsToBackend} from "../fetchBackend.tsx";

export const useGetAllPharmacists = () => {
    const getAll = APIEndpoints.pharmacist.getAll;
    return useFetchFromBackend("pharmacist", getAll.url, getAll.method);
};

export const useGetPharmacistById = () => {
    const getById = APIEndpoints.pharmacist.getById;
    return usePathParamsToBackend(`pharmacist`, getById.url, getById.method);
};

export const useAddPharmacist = () => {
    const add = APIEndpoints.pharmacist.add;
    return useMutateToBackend("pharmacist-add", add.url, add.method);
};

export const useUpdatePharmacist = () => {
    const update = APIEndpoints.pharmacist.update;
    return usePathParamsToBackend(`pharmacist-update`, update.url, update.method);
};

export const useRemovePharmacist = () => {
    const remove = APIEndpoints.pharmacist.remove;
    return usePathParamsToBackend(`pharmacist-remove`, remove.url, remove.method);
};