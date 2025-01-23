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
export const useFetchFromBackend = (key: string, endpoint: string, method: HttpRequestMethods) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: [key, endpoint, method],
        queryFn: () => fetchData(endpoint, method, token || ""),
        retry: true,
    })
};


export const useMutateToBackend = (key: string, endpoint: string, method: HttpRequestMethods) => {
    const { token } = useAuth();

    return useMutation({
        mutationKey: [key, endpoint, method],
        mutationFn: (body: object) => fetchData(endpoint, method, token || "", body),
    });
};

export const usePathParamsToBackend = (key: string, endpoint: string, method: HttpRequestMethods) => {
    const { token } = useAuth();
    interface mutationParams {
        param: string,
        body?: object
    }

    return useMutation({
        mutationKey: [key, endpoint, method],
        mutationFn: ({param, body}: mutationParams) => fetchData(endpoint+"/"+param, method, token || "", body),
    });
};

const fetchData = async (endpoint: string, method: HttpRequestMethods, token?: string, body?: object) => {
    const response = await fetch(url + endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    if (response.status === 204 || response.status === 202) {
        return null;
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        try {
            return await response.json();
        } catch (error) {
            console.error("Failed to parse JSON:", await response.text(), error);
            throw new Error('Failed to parse JSON from response');
        }
    }
    const responseText = await response.text();
    console.warn("Non-JSON response received:", responseText);
    return responseText;
};
