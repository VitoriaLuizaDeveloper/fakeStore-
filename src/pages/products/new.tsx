import { useState } from 'react';
import { useRouter } from 'next/router';
import { useProducts, Product } from '../../hooks/useProducts';
import { ProductForm } from '../../components/ProductForm';
import { Loader } from '../../components/Loader';
import { Feedback } from '../../components/Feedback';
import { Header } from '../../components/Header';

export default function NewProduct() {
    const router = useRouter();
    const { createProduct, loading, error } = useProducts();
    const [success, setSuccess] = useState('');

    const handleCreate = async (data: Product) => {
        const created = await createProduct(data);
        if (created) {
            setSuccess('Product created successfully!');
            setTimeout(() => router.push(`/products/${created.id}`), 1500);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-100 overflow-x-hidden">
            <Header />
            <main className="flex-1 p-6 md:p-12 max-w-2xl mx-auto w-full pt-20 mt-16">
                {error && <Feedback message={error} type="error" />}
                {success && <Feedback message={success} type="success" />}
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">New Product</h1>
                    <ProductForm onSubmit={handleCreate} loading={loading} />
                </div>
            </main>
        </div>
    );
} 