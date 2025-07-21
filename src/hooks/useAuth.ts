import { useState, useEffect } from 'react';

const FAKE_EMAIL = 'admin@admin.com';
const FAKE_PASSWORD = '123456';
const FAKE_JWT = 'admin-token-123';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token === FAKE_JWT);
    }, []);

    const login = (email: string, password: string) => {
        if (email === FAKE_EMAIL && password === FAKE_PASSWORD) {
            localStorage.setItem('token', FAKE_JWT);
            setIsAuthenticated(true);
            setError(null);
            return true;
        } else {
            setError('E-mail ou senha inválidos');
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setError(null);
    };

    const isAdmin = () => {
        return localStorage.getItem('token') === FAKE_JWT;
    };

    return { isAuthenticated, error, login, logout, isAdmin };
} 