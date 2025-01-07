import { APIEndpoints } from "../Endpoints";
import {useFetchFromBackend} from "../fetchBackend.tsx";

export const useGetAllPharmacists = () => {
    const getAll = APIEndpoints.pharmacist.getAll;
    return useFetchFromBackend("pharmacist", getAll.url, getAll.method);
};

export const useGetPharmacistById = (id: number) => {
    const getById = APIEndpoints.pharmacist.getById(id);
    return useFetchFromBackend(`pharmacist-${id}`, getById.url, getById.method);
};

export const useAddPharmacist = () => {
    const add = APIEndpoints.pharmacist.add;
    return useFetchFromBackend("pharmacist-add", add.url, add.method);
};

export const useUpdatePharmacist = (id: number) => {
    const update = APIEndpoints.pharmacist.update(id);
    return useFetchFromBackend(`pharmacist-update-${id}`, update.url, update.method);
};

export const useRemovePharmacist = (id: number) => {
    const remove = APIEndpoints.pharmacist.remove(id);
    return useFetchFromBackend(`pharmacist-remove-${id}`, remove.url, remove.method);
};