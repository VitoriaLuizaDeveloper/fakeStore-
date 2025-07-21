import { useState } from 'react';

const FAKE_EMAIL = 'admin@admin.com';
const FAKE_PASSWORD = '123456';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = (email: string, password: string) => {
        if (email === FAKE_EMAIL && password === FAKE_PASSWORD) {
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
        setIsAuthenticated(false);
        setError(null);
    };

    return { isAuthenticated, error, login, logout };
} 