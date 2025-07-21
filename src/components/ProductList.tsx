import { Product } from '../hooks/useProducts';

interface ProductListProps {
    products: Product[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ProductList({ products, onView, onEdit, onDelete }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-40 object-contain mb-4 rounded-lg bg-gray-50"
                    />
                    <h2 className="font-bold text-lg mb-1 text-blue-900 truncate">{product.title}</h2>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{product.category}</p>
                    <p className="font-semibold mb-4 text-blue-700">R$ {product.price}</p>
                    <div className="flex gap-2 mt-auto">
                        <button className="px-4 py-1 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition" onClick={() => onView(product.id!)}>Ver</button>
                        <button className="px-4 py-1 rounded-lg bg-yellow-400 text-yellow-900 font-medium hover:bg-yellow-500 transition" onClick={() => onEdit(product.id!)}>Editar</button>
                        <button className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition" onClick={() => onDelete(product.id!)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
} 