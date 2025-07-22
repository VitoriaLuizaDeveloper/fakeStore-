import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { Feedback } from '../components/Feedback';

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = '123456';

export default function Login() {
    const { isAuthenticated, error, login } = useAuth();
    const [form, setForm] = useState({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(form.email, form.password)) {
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => router.push('/'), 1000);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-100">
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-6 border border-gray-100">
                    <h1 className="text-3xl font-extrabold mb-2 text-primary text-center">Login</h1>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                        required
                    />
                    <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary/90 transition">
                        Login
                    </button>
                    {error && <Feedback message={error} type="error" />}
                    {success && <Feedback message={success} type="success" />}
                </form>
            </main>
        </div>
    );
} 