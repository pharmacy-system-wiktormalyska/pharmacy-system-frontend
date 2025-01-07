import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend} from "../fetchBackend.tsx";

export const useGetAllAdministrators = () => {
    const getAll = APIEndpoints.administrator.getAll;
    return useFetchFromBackend("administrator", getAll.url, getAll.method);
};

export const useGetAdministratorById = (id: number) => {
    const getById = APIEndpoints.administrator.getById(id);
    return useFetchFromBackend(`administrator-${id}`, getById.url, getById.method);
};

export const useAddAdministrator = () => {
    const add = APIEndpoints.administrator.add;
    return useFetchFromBackend("administrator-add", add.url, add.method);
};

export const useUpdateAdministrator = (id: number) => {
    const update = APIEndpoints.administrator.update(id);
    return useFetchFromBackend(`administrator-update-${id}`, update.url, update.method);
};

export const useRemoveAdministrator = (id: number) => {
    const remove = APIEndpoints.administrator.remove(id);
    return useFetchFromBackend(`administrator-remove-${id}`, remove.url, remove.method);
};