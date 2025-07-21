import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export function Header() {
    const router = useRouter();
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-black shadow z-50 flex items-center justify-between px-8">
            <Image src="/images/logo.png" alt="Logo" width={50} height={45} />
            <nav className="flex items-center gap-8">
                <Link href="/" className={`text-lg font-bold text-blue-700 hover:text-blue-900 transition ${router.pathname === '/' ? 'underline' : ''}`}>Produtos</Link>
            </nav>
            <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
            >
                Entrar
            </button>
        </header>
    );
} 