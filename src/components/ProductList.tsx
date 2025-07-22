import { Product } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

interface ProductListProps {
    products: Product[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ProductList({ products, onView, onEdit, onDelete }: ProductListProps) {
    const { isAdmin } = useAuth();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => onView(product.id!)}
                    className="bg-white rounded-2xl shadow-lg p-4 flex flex-col border border-gray-100 group transition hover:shadow-2xl hover:cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label={`View product ${product.title}`}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onView(product.id!); }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-32 object-contain mb-3 rounded-lg bg-gray-50 group-hover:scale-105 transition"
                    />
                    <h2 className="font-bold text-lg mb-1 text-primary truncate text-center">{product.title}</h2>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide text-center">{product.category}</p>
                    <p className="font-semibold mb-2 text-primary text-center">${product.price}</p>
                    {isAdmin() && (
                        <div className="flex gap-2 mt-auto pt-2 justify-center">
                            <button
                                className="px-4 py-1 rounded-lg bg-yellow-400 text-yellow-900 font-medium hover:bg-yellow-500 transition"
                                onClick={e => { e.stopPropagation(); onEdit(product.id!); }}
                                tabIndex={0}
                                aria-label={`Edit product ${product.title}`}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                                onClick={e => { e.stopPropagation(); onDelete(product.id!); }}
                                tabIndex={0}
                                aria-label={`Delete product ${product.title}`}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
} 