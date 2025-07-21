import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '../hooks/useProducts';

export function Sidebar() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=10')
            .then((res) => res.json())
            .then(setProducts);
    }, []);

    return (
        <aside className="fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-400 shadow-xl z-40 transition-transform md:relative md:translate-x-0 w-64 p-0">
            <div className="flex items-center gap-2 px-6 py-6">
                <span className="text-white font-extrabold text-2xl tracking-tight">FakeStore</span>
            </div>
            <nav className="flex flex-col gap-4 p-4 overflow-y-auto">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 bg-white/80 hover:bg-white transition rounded-lg p-2 shadow-sm"
                    >
                        <img src={product.image} alt={product.title} className="w-10 h-10 object-contain rounded bg-gray-100" />
                        <span className="text-sm font-medium text-blue-900 truncate">{product.title}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
} 