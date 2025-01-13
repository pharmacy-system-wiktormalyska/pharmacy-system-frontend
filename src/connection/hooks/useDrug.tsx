import {useFetchFromBackend, useMutateToBackend} from "../fetchBackend";
import {APIEndpoints} from "../Endpoints.tsx";
import {DrugResponse} from "../../values/BackendValues.tsx";

export const useGetAllDrugs = () => {
    const getAll = APIEndpoints.drug.getAll;
    return useFetchFromBackend("drug", getAll.url, getAll.method);
};

export const useGetDrugById = (id: number) => {
    const getById = APIEndpoints.drug.getById(id);
    return useFetchFromBackend(`drug-${id}`, getById.url, getById.method);
};

export const useAddDrug = (drug?: DrugResponse) => {
    const add = APIEndpoints.drug.add;
    return useMutateToBackend("drug-add", add.url, add.method, drug);
};

export const useUpdateDrug = (id: number) => {
    const update = APIEndpoints.drug.update(id);
    return useFetchFromBackend(`drug-update-${id}`, update.url, update.method);
};

export const useRemoveDrug = (id: number) => {
    const remove = APIEndpoints.drug.remove(id);
    return useFetchFromBackend(`drug-remove-${id}`, remove.url, remove.method);
};