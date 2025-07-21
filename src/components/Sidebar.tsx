import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Sidebar() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    return (
        <aside className="fixed left-0 mt-16 h-screen bg-gradient-to-b from-primary to-pink-200 shadow-xl z-40 transition-transform md:relative md:translate-x-0 w-52 p-0">
            <nav className="flex flex-col gap-3 p-4 overflow-y-auto h-full">
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
    );
} 