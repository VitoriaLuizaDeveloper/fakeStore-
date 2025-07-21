import { useState } from 'react';
import { Product } from '../hooks/useProducts';

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Product) => void;
    loading?: boolean;
}

export function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
    const [form, setForm] = useState<Product>(
        initialData || { title: '', price: 0, description: '', category: '', image: '' }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto flex flex-col gap-6 border border-gray-100">
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Título"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                required
            />
            <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Preço"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                required
            />
            <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Categoria"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                required
            />
            <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="URL da imagem"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg"
                required
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descrição"
                className="textarea textarea-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg min-h-[100px]"
                required
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
} 