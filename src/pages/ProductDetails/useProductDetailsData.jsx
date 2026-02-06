import { useState, useEffect } from 'react';

const useProductDetailsData = (id) => {
    const [product, setProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    useEffect(() => {
        if (!product?.category) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/category/${product.category}`);
                const data = await response.json();
                setCurrentCategory(data);
                console.log('currentCategory products', data);
            } catch (error) {
                console.error('Error fetching category products:', error);
            }
        };

        fetchProducts();
    }, [product?.category]);

    return { product, currentCategory };
};

export default useProductDetailsData;