import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface AuthContextType {
    token: string | null
    setToken: (token: string | null) => void
    isAuthenticated: boolean | false
    setIsAuthenticated : (isAuthenticated : boolean | false) => void
    storedDecodedToken : string | null
    setStoredDecodedToken : (decodedToken : string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | false>(false)
    const [storedDecodedToken, setStoredDecodedToken] = useState<string | null>(null)

    useEffect(() => {
        const savedToken = localStorage.getItem("token")

        if (savedToken) {
            setToken(savedToken)
            setIsAuthenticated(true)
        }
    }, []);

    return (
        <AuthContext.Provider value={{token, setToken, isAuthenticated, setIsAuthenticated, storedDecodedToken, setStoredDecodedToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}