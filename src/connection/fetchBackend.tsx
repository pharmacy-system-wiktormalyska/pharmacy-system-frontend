import {url} from "../values/BackendValues.tsx";
import {useQuery} from "@tanstack/react-query";
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

export const useFetchFromBackend = (key: string, endpoint: string, method: HttpRequestMethods) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: [key, endpoint, method],
        queryFn: () => fetchData(endpoint, method, token || ""),
        retry: true,
    });
};

const fetchData = async (endpoint: string, method: HttpRequestMethods, token?: string) => {
    const response = await fetch(url+endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
