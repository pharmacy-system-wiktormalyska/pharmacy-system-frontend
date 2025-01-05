import { url } from "../values/BackendValues.tsx";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBackend = async (endpoint: string, method: string = "GET", token?: string | null) => {
    const maxAttempts = 10;
    let attempts = 0;
    while (attempts < maxAttempts) {
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
                console.error(`Failed to fetch request. Status: ${response.status}`);
                return;
            }

            const text = await response.text();
            if (!text) {
                console.warn("Server returned no content");
                return [];
            }
            return JSON.parse(text);
        } catch (err) {
            const error = err as Error;
            if (error.message.includes("403")) {
                attempts++;
                if (attempts >= maxAttempts) {
                    console.error("Failed to fetch data after 10 attempts:", error);
                    alert("Failed to fetch data after 10 attempts. Please try again later.");
                    return;
                }
                await delay(1000); // Retry after delay
            } else {
                // Handle non-403 errors more gracefully
                console.error("Error fetching data:", error);
                return;
            }
        }
    }
};
