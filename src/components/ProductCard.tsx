import { Product } from '../hooks/useProducts';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-lg mx-auto border border-gray-100">
            <img src={product.image} alt={product.title} className="h-56 object-contain mb-6 rounded-lg bg-gray-50" />
            <h2 className="font-extrabold text-2xl mb-2 text-blue-900 text-center">{product.title}</h2>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{product.category}</p>
            <p className="mb-4 text-center text-gray-600">{product.description}</p>
            <p className="font-bold text-2xl text-blue-700 mb-2">R$ {product.price}</p>
        </div>
    );
} 