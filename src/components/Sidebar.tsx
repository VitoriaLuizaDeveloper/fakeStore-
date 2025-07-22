import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Sidebar() {
    const [categories, setCategories] = useState<string[]>([]);
    const { useIsAdmin } = useAuth();
    const isAdmin = useIsAdmin();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    return (
        <>
            <button
                className="fixed top-20 left-2 z-50 p-2 bg-primary text-white rounded-full shadow md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open sidebar"
                style={{ display: open ? 'none' : undefined }}
            >
                {/* Seta → */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 mt-16 h-screen bg-gradient-to-b from-primary to-pink-200 shadow-xl z-40 w-52 p-0 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
                style={{ minHeight: 'calc(100vh - 4rem)' }}
            >
                {/* Botão para fechar em mobile */}
                <button
                    className="absolute top-4 right-4 md:hidden bg-white text-primary rounded-full p-1 shadow"
                    onClick={() => setOpen(false)}
                    aria-label="Close sidebar"
                    style={{ display: open ? undefined : 'none' }}
                >
                    {/* Seta ← */}
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <nav className="flex flex-col gap-3 p-4 overflow-y-auto h-full min-h-0 pt-20 md:pt-8">
                    {isAdmin && (
                        <Link
                            href="/products/new"
                            className="bg-white text-primary font-bold rounded-lg p-2 shadow-sm border border-primary hover:bg-gray-100 hover:text-primary transition text-center mb-2"
                        >
                            + New Product
                        </Link>
                    )}
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/category/${encodeURIComponent(cat)}`}
                            className="bg-white/80 hover:bg-white transition rounded-lg p-2 shadow-sm text-primary font-medium capitalize"
                        >
                            {cat}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
} 