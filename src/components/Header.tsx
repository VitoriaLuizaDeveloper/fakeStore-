import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';

export function Header() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white shadow z-50 flex items-center justify-between px-8">
            <button onClick={() => router.push('/')} className="focus:outline-none">
                <Image src="/images/logo.png" alt="Logo" width={50} height={45} />
            </button>
            <nav className="flex items-center gap-8">
                <Link href="/" className={`text-lg font-bold text-primary hover:text-primary/80 transition ${router.pathname === '/' ? 'underline' : ''}`}> All Products</Link>
            </nav>
            {isAuthenticated ? (
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition shadow"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={() => router.push('/login')}
                    className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition shadow"
                >
                    Login
                </button>
            )}
        </header>
    );
} 