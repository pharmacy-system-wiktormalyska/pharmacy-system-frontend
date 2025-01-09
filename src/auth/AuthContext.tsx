import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";

export interface DecodedTokenType {
    sub?: string;
    name: string;
    iat: number;
    exp: number;
    authorities: string[];
    user_id: number
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
    storedDecodedToken: DecodedTokenType | null;
    setDecodedToken: React.Dispatch<React.SetStateAction<DecodedTokenType | null>>;
    login: (newToken:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children}) => {
    const [token, setToken] = useState<string | null>(null);
    const [storedDecodedToken, setDecodedToken] = useState<DecodedTokenType | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (newToken: string) => {
        console.log(newToken)
        setCookie("token", newToken, { path: "/" });
        setToken(newToken);
        try {
            const decodedToken = jwtDecode<DecodedTokenType>(newToken);
            setDecodedToken(decodedToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Invalid token during login:", error);
            logout();
        }
    };

    const logout = () => {
        removeCookie("token", { path: "/" });
        setToken(null);
        setDecodedToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (cookies.token) {
            if (cookies.token !== token) {
                setToken(cookies.token);
                try {
                    const decodedToken = jwtDecode<DecodedTokenType>(cookies.token);
                    setDecodedToken(decodedToken);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Invalid token detected in cookies:", error);
                    logout();
                }
            }
        } else {
            console.log("No token found in cookies, redirecting to login.");
            logout();
        }
    }, [cookies.token, logout, token]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                setToken,
                storedDecodedToken,
                setDecodedToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
