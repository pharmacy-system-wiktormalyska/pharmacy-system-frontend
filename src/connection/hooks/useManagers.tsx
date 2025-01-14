import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend} from "../fetchBackend.tsx";

export const useGetAllManagers = () => {
    const getAll = APIEndpoints.manager.getAll;
    return useFetchFromBackend("manager", getAll.url, getAll.method);
};

export const useGetManagerById = () => {
    const getById = APIEndpoints.manager.getById();
    return useFetchFromBackend(`manager`, getById.url, getById.method);
};

export const useAddManager = () => {
    const add = APIEndpoints.manager.add;
    return useMutateToBackend("manager-add", add.url, add.method);
};

export const useUpdateManager = () => {
    const update = APIEndpoints.manager.update();
    return useFetchFromBackend(`manager-update`, update.url, update.method);
};

export const useRemoveManager = () => {
    const remove = APIEndpoints.manager.remove();
    return useFetchFromBackend(`manager-remove`, remove.url, remove.method);
};