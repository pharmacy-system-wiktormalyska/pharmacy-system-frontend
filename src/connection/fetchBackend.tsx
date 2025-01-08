import {url} from "../values/BackendValues.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth} from "../auth/AuthContext.tsx";

export enum HttpRequestMethods{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE',
    CONNECT = 'CONNECT',
}
//TODO: Upewnic czy działa
export const useFetchFromBackend = (key: string, endpoint: string, method: HttpRequestMethods, body?: object) => {
    const { token } = useAuth();

    const query = useQuery({
        queryKey: [key, endpoint, method],
        queryFn: () => fetchData(endpoint, method, token || "", body),
        retry: true,
    });

    const mutation = useMutation({
        mutationKey: [key, endpoint, method],
        mutationFn: (body: object) => fetchData(endpoint, method, token || "", body),
    });

    return method === HttpRequestMethods.GET ? query : mutation;
};


const fetchData = async (endpoint: string, method: HttpRequestMethods, token?: string, body?:object) => {
    const response = await fetch(url+endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: body? JSON.stringify(body) : null
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
