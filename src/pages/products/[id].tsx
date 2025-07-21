import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProducts, Product } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { ProductForm } from '../../components/ProductForm';
import { Loader } from '../../components/Loader';
import { Feedback } from '../../components/Feedback';
import { Header } from '../../components/Header';

export default function ProductDetail() {
    const router = useRouter();
    const { id, edit } = router.query;
    const { fetchProduct, updateProduct, loading, error } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (id) {
            fetchProduct(Number(id)).then(setProduct);
        }
        // eslint-disable-next-line
    }, [id]);

    const handleUpdate = async (data: Product) => {
        if (!id) return;
        const updated = await updateProduct(Number(id), data);
        if (updated) {
            setSuccess('Product updated successfully!');
            setProduct(updated);
            setTimeout(() => setSuccess(''), 2000);
            router.replace(`/products/${id}`);
        }
    };

    if (loading || !product) return <Loader />;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-100">
            <Header />
            <main className="flex-1 p-6 md:p-12 max-w-2xl mx-auto w-full pt-20 mt-16">
                {error && <Feedback message={error} type="error" />}
                {success && <Feedback message={success} type="success" />}
                {edit ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                        <ProductForm initialData={product} onSubmit={handleUpdate} loading={loading} />
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
                        <ProductCard product={product} />
                    </div>
                )}
            </main>
        </div>
    );
} 