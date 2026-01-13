"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/type";
import ProductCard from "../common/ProductCard";
import { fetchData } from "@/lib/api";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchData<Product[]>("/products?perPage=10"); 
                setProducts(res ?? []);
            } catch (err) {
                console.error("Product List Error:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <p className="text-center mt-5">Loading products...</p>;
    }

    if (!products.length) {
        return (
            <div className="bg-white p-5 rounded-md border mt-3 text-center">
                <p>No Products Available</p>
            </div>
        );
    }

    return (
        <div 
            className="mt-6"
        >
            <h2
                className="text-2xl md:text-3xl font-bold mb-4 text-center"
            >
                Featured Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
