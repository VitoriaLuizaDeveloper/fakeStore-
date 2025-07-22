import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProducts, Product } from '../../hooks/useProducts';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { Feedback } from '../../components/Feedback';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const { products, loading, error, fetchProducts, deleteProduct, setProducts } = useProducts();

    useEffect(() => {
        if (category && typeof category === 'string') {
            fetchProducts(category);
        }
    }, [category]);

    const handleView = (id: number) => {
        router.push(`/products/${id}`);
    };

    const handleEdit = (id: number) => {
        router.push(`/products/${id}?edit=1`);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-100 overflow-x-hidden">
            <Header />
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 ml-0 w-full pt-20 mt-16">
                <h1 className="text-3xl font-extrabold mb-8 text-primary capitalize">{category}</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <ProductList products={products} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                {error && <Feedback message={error} type="error" />}
            </main>
        </div>
    );
} 