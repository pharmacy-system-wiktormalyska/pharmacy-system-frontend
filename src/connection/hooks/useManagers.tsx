import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend} from "../fetchBackend.tsx";

export const useGetAllManagers = () => {
    const getAll = APIEndpoints.manager.getAll;
    return useFetchFromBackend("manager", getAll.url, getAll.method);
};

export const useGetManagerById = (id: number) => {
    const getById = APIEndpoints.manager.getById(id);
    return useFetchFromBackend(`manager-${id}`, getById.url, getById.method);
};

export const useAddManager = () => {
    const add = APIEndpoints.manager.add;
    return useFetchFromBackend("manager-add", add.url, add.method);
};

export const useUpdateManager = (id: number) => {
    const update = APIEndpoints.manager.update(id);
    return useFetchFromBackend(`manager-update-${id}`, update.url, update.method);
};

export const useRemoveManager = (id: number) => {
    const remove = APIEndpoints.manager.remove(id);
    return useFetchFromBackend(`manager-remove-${id}`, remove.url, remove.method);
};