import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { Loader } from '../components/Loader';
import { Feedback } from '../components/Feedback';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export default function Home() {
  const router = useRouter();
  const { products, loading, error, fetchProducts, deleteProduct, setProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleView = (id: number) => {
    router.push(`/products/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/products/${id}?edit=1`);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <Header />
      <Sidebar />
      <main className="flex-1 p-6 md:p-12 ml-0 md:ml-64 max-w-6xl mx-auto w-full pt-20">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-900">Produtos</h1>
        {loading && <Loader />}
        {error && <Feedback message={error} type="error" />}
        <ProductList products={products} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
    </div>
  );
}
