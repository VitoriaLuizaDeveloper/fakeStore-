import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { Loader } from '../components/Loader';
import { Feedback } from '../components/Feedback';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

const PAGE_SIZE = 8;

export default function Home() {
  const router = useRouter();
  const { products, loading, error, fetchProducts, deleteProduct, setProducts } = useProducts();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts(undefined, PAGE_SIZE * page).then(() => {
      if (total === 0) {
        fetch('https://fakestoreapi.com/products')
          .then((res) => res.json())
          .then((data) => setTotal(data.length));
      }
    });
    // eslint-disable-next-line
  }, [page]);

  const paginatedProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

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
        <h1 className="text-3xl font-extrabold mb-8 text-primary">Products</h1>
        {error && <Feedback message={error} type="error" />}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <ProductList products={paginatedProducts} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <div className="flex justify-center gap-2 mt-8">
              <button
                className="px-4 py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 font-bold text-primary">Page {page} of {totalPages}</span>
              <button
                className="px-4 py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
