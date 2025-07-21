import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/Sidebar';
import { Feedback } from '../components/Feedback';

export default function Login() {
    const { isAuthenticated, error, login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(form.email, form.password)) {
            setSuccess('Login realizado com sucesso!');
            setTimeout(() => router.push('/'), 1500);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            <Sidebar />
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 ml-0 md:ml-64">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-6 border border-gray-100">
                    <h1 className="text-3xl font-extrabold mb-2 text-blue-900 text-center">Login</h1>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Senha"
                        className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                        required
                    />
                    <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition">
                        Entrar
                    </button>
                    {error && <Feedback message={error} type="error" />}
                    {success && <Feedback message={success} type="success" />}
                </form>
            </main>
        </div>
    );
} 