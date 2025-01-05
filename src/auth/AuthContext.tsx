import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {createBrowserRouter} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import AuthPage from "../pages/Auth.tsx"; // Ensure this is correctly imported

export interface DecodedTokenType {
    sub?: string
    name: string
    iat: number
    exp: number
    authorities: string[]
}

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    storedDecodedToken: DecodedTokenType | null;
    setDecodedToken: React.Dispatch<React.SetStateAction<DecodedTokenType | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [storedDecodedToken, setDecodedToken] = useState<DecodedTokenType | null>(null);
    const [cookies] = useCookies(["token"]);

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <AuthPage />,
        }
    ])

    useEffect(() => {
        if (cookies.token) {
            if (cookies.token !== token) {
                setToken(cookies.token);
                try {
                    const decodedToken = jwtDecode<DecodedTokenType>(cookies.token);
                    setDecodedToken(decodedToken);
                } catch (error) {
                    console.error("Invalid token:", error);
                    setToken(null);
                    setDecodedToken(null);
                    router.navigate("/login")
                }
            }
        } else {
            console.log("No user data found!");
            router.navigate("/login")
        }
    }, [router, cookies.token, token]);

    return (
        <AuthContext.Provider value={{ token, setToken, storedDecodedToken, setDecodedToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
