import {useFetchFromBackend, useMutateToBackend, usePathParamsToBackend} from "../fetchBackend";
import {APIEndpoints} from "../Endpoints.tsx";

export const useGetAllDrugs = () => {
    const getAll = APIEndpoints.drug.getAll;
    return useFetchFromBackend("drug", getAll.url, getAll.method);
};

export const useGetDrugById = () => {
    const getById = APIEndpoints.drug.getById;
    return usePathParamsToBackend(`drug`, getById.url, getById.method);
};

export const useAddDrug = () => {
    const add = APIEndpoints.drug.add;
    return useMutateToBackend("drug-add", add.url, add.method);
};

export const useUpdateDrug = () => {
    const update = APIEndpoints.drug.update;
    return useMutateToBackend(`drug-update`, update.url, update.method);
};

export const useRemoveDrug = () => {
    const remove = APIEndpoints.drug.remove;
    return usePathParamsToBackend(`drug-remove`, remove.url, remove.method);
};