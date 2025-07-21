import { useState } from 'react';
import { useRouter } from 'next/router';
import { useProducts, Product } from '../../hooks/useProducts';
import { ProductForm } from '../../components/ProductForm';
import { Loader } from '../../components/Loader';
import { Feedback } from '../../components/Feedback';
import { Sidebar } from '../../components/Sidebar';

export default function NewProduct() {
    const router = useRouter();
    const { createProduct, loading, error } = useProducts();
    const [success, setSuccess] = useState('');

    const handleCreate = async (data: Product) => {
        const created = await createProduct(data);
        if (created) {
            setSuccess('Produto criado com sucesso!');
            setTimeout(() => router.push(`/products/${created.id}`), 1500);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 ml-64">
                <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
                {error && <Feedback message={error} type="error" />}
                {success && <Feedback message={success} type="success" />}
                <ProductForm onSubmit={handleCreate} loading={loading} />
            </main>
        </div>
    );
} 