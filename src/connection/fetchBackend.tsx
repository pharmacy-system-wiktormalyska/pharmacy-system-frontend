import { url } from "../values/BackendValues.tsx";

export const fetchBackend = async (endpoint: string, method: string = "GET", token?: string | null) => {
    try {
        const response = await fetch(url + endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch request. Status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
            console.warn("Server returned no content");
            return [];
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};