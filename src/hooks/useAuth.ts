import { useState, useEffect } from 'react';

const FAKE_EMAIL = 'admin@admin.com';
const FAKE_PASSWORD = '123456';
const FAKE_JWT = 'admin-token-123';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem('token');
            setIsAuthenticated(token === FAKE_JWT);
        }
    }, []);

    const login = (email: string, password: string) => {
        if (email === FAKE_EMAIL && password === FAKE_PASSWORD) {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('token', FAKE_JWT);
            }
            setIsAuthenticated(true);
            setError(null);
            return true;
        } else {
            setError('E-mail or password invalid');
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token');
        }
        setIsAuthenticated(false);
        setError(null);
    };

    // SSR-safe: use only in client components
    const useIsAdmin = () => {
        const [isAdmin, setIsAdmin] = useState(false);
        useEffect(() => {
            const token = sessionStorage.getItem('token');
            setIsAdmin(token === FAKE_JWT);
        }, []);
        return isAdmin;
    };

    const isAdmin = () => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem('token') === FAKE_JWT;
    };

    return { isAuthenticated, error, login, logout, isAdmin, useIsAdmin };
} 