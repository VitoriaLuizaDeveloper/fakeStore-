import { useState, useEffect } from 'react';
import { Product } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Product) => void;
    loading?: boolean;
}

export function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
    const [form, setForm] = useState<Product>(
        initialData || { title: '', price: 0, description: '', category: '', image: '' }
    );
    const [categories, setCategories] = useState<string[]>([]);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                placeholder="Title"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                required
            />
            <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                required
            />
            <div className="flex gap-4 items-center">
                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                    required
                />
                {form.image && (
                    <img src={form.image} alt="Preview" className="w-20 h-20 object-contain rounded border border-gray-200 bg-gray-50" />
                )}
            </div>
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input input-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
                required
            >
                <option value="" disabled>Select category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="textarea textarea-bordered w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg min-h-[100px]"
                required
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary/90 transition" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
        </form>
    );
} 