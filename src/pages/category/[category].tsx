import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { Feedback } from '../../components/Feedback';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const { products, loading, error, fetchProducts } = useProducts();

    useEffect(() => {
        if (category && typeof category === 'string') {
            fetchProducts(category);
        }
        // eslint-disable-next-line
    }, [category]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-100 overflow-x-hidden">
            <Header />
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 ml-0 md:ml-32 max-w-7xl mx-auto w-full pt-20 mt-16">
                <h1 className="text-3xl font-extrabold mb-8 text-primary capitalize">{category}</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <ProductList products={products} onView={() => { }} onEdit={() => { }} onDelete={() => { }} />
                )}
                {error && <Feedback message={error} type="error" />}
            </main>
        </div>
    );
} 