import { useState } from 'react';

export interface Product {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const API_URL = 'https://fakestoreapi.com/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Listar todos os produtos ou por categoria
    const fetchProducts = async (category?: string, limit?: number) => {
        setLoading(true);
        setError(null);
        try {
            let url = API_URL;
            if (category) {
                url += `/category/${category}`;
            }
            if (limit) {
                url += category ? `?limit=${limit}` : `?limit=${limit}`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError('Erro ao buscar produtos');
        } finally {
            setLoading(false);
        }
    };

    // Listar categorias
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/categories`);
            return await res.json();
        } catch (err) {
            setError('Erro ao buscar categorias');
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Buscar produto por ID
    const fetchProduct = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`);
            return await res.json();
        } catch (err) {
            setError('Erro ao buscar produto');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Criar produto
    const createProduct = async (product: Product) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            return await res.json();
        } catch (err) {
            setError('Erro ao criar produto');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Atualizar produto (PUT)
    const updateProduct = async (id: number, product: Product) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            return await res.json();
        } catch (err) {
            setError('Erro ao atualizar produto');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Atualizar parcialmente produto (PATCH)
    const patchProduct = async (id: number, partial: Partial<Product>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(partial),
            });
            return await res.json();
        } catch (err) {
            setError('Erro ao atualizar parcialmente produto');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Deletar produto
    const deleteProduct = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            return await res.json();
        } catch (err) {
            setError('Erro ao deletar produto');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        patchProduct,
        deleteProduct,
        fetchCategories,
        setProducts,
    };
} 