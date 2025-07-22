import { Product } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

interface ProductCardProps {
    product: Product;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const { isAdmin } = useAuth();
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-lg mx-auto border border-gray-100">
            <img src={product.image} alt={product.title} className="h-56 object-contain mb-6 rounded-lg bg-gray-50" />
            <h2 className="font-extrabold text-2xl mb-2 text-primary text-center">{product.title}</h2>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{product.category}</p>
            <p className="mb-4 text-center text-gray-600">{product.description}</p>
            <p className="font-bold text-2xl text-primary mb-2">${product.price}</p>
            {isAdmin() && (onEdit || onDelete) && (
                <div className="flex gap-2 mt-4">
                    {onEdit && (
                        <button
                            className="px-4 py-1 rounded-lg bg-yellow-400 text-yellow-900 font-medium hover:bg-yellow-500 transition"
                            onClick={() => onEdit(product.id!)}
                        >
                            Edit
                        </button>
                    )}
                    {onDelete && (
                        <button
                            className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                            onClick={() => onDelete(product.id!)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
} 