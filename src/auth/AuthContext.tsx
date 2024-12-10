import React, {createContext, ReactNode, useContext, useState} from "react";

export interface DecodedTokenType {
    sub? : string
}

interface AuthContextType {
    token: string | null
    setToken: (token: string | null) => void
    storedDecodedToken : object | null
    setStoredDecodedToken : (decodedToken : object | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null)
    const [storedDecodedToken, setStoredDecodedToken] = useState<DecodedTokenType | null>(null)

    return (
        <AuthContext.Provider value={{token, setToken, storedDecodedToken, setStoredDecodedToken}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}