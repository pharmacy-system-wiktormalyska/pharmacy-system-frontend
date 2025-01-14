import { APIEndpoints } from "../Endpoints";
import {useFetchFromBackend} from "../fetchBackend.tsx";

export const useGetAllPharmacists = () => {
    const getAll = APIEndpoints.pharmacist.getAll;
    return useFetchFromBackend("pharmacist", getAll.url, getAll.method);
};

export const useGetPharmacistById = () => {
    const getById = APIEndpoints.pharmacist.getById();
    return useFetchFromBackend(`pharmacist`, getById.url, getById.method);
};

export const useAddPharmacist = () => {
    const add = APIEndpoints.pharmacist.add;
    return useFetchFromBackend("pharmacist-add", add.url, add.method);
};

export const useUpdatePharmacist = () => {
    const update = APIEndpoints.pharmacist.update();
    return useFetchFromBackend(`pharmacist-update`, update.url, update.method);
};

export const useRemovePharmacist = () => {
    const remove = APIEndpoints.pharmacist.remove();
    return useFetchFromBackend(`pharmacist-remove`, remove.url, remove.method);
};