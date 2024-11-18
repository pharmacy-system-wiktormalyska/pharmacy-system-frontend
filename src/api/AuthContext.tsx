import React, {createContext, useState, useContext, ReactNode} from 'react';
import { User } from '../values/types.ts'
import axios from "./axios.ts";

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    loginByToken: (token: string) => Promise<void>;
    logout: () => void;
    getUserRoles: () => string[] | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider:React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    }

    const loginByToken = async (token: string) => {
        try {
            //Mock user for development
            if (process.env.NODE_ENV === 'development' && token === 'admintoken') {
                const mockUser: User = {
                    id: '1',
                    post: '1',
                    token: 'admintoken',
                    firstName: 'Admin Name',
                    lastName: 'Admin LastName',
                    roles: ['admin']
                }
                setUser(mockUser)
                return
            }

            const response = await axios.get<User>('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            } catch (error) {
                console.error(error);
                logout()
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    const getUserRoles = () => {
        loginByToken(localStorage.getItem('token') || '')
        return user?.roles
    }

    return (
        <AuthContext.Provider value={{user, login, loginByToken,  logout , getUserRoles}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return context;
}