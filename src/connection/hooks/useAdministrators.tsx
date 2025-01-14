import {APIEndpoints} from "../Endpoints.tsx";
import {useFetchFromBackend, useMutateToBackend, usePathParamsToBackend} from "../fetchBackend.tsx";

export const useGetAllAdministrators = () => {
    const getAll = APIEndpoints.administrator.getAll;
    return useFetchFromBackend("administrator", getAll.url, getAll.method);
};

export const useGetAdministratorById = () => {
    const getById = APIEndpoints.administrator.getById();
    return usePathParamsToBackend(`administrator`, getById.url, getById.method);
};

export const useAddAdministrator = () => {
    const add = APIEndpoints.administrator.add;
    return useMutateToBackend("administrator-add", add.url, add.method);
};

export const useUpdateAdministrator = () => {
    const update = APIEndpoints.administrator.update();
    return useMutateToBackend(`administrator-update-`, update.url, update.method);
};

export const useRemoveAdministrator = () => {
    const remove = APIEndpoints.administrator.remove();
    return usePathParamsToBackend(`administrator-remove`, remove.url, remove.method);
};