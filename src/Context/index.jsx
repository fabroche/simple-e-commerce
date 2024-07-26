import {createContext, useEffect, useState} from "react";

const ShopContext = createContext();

function ShopProvider({children}) {
    const [products, setProducts] = useState([]);
    const [shoppingCartCount, setShoppingCartCount] = useState(0);
    const [productsDetails, setProductsDetails] = useState({});

    // Estados derivados

    const isProductDetailsOpen = Object.keys(productsDetails).length > 0

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products/');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts()

    }, []);
    return (
        <ShopContext.Provider value={{
            products,
            setProducts,
            shoppingCartCount,
            setShoppingCartCount,
            productsDetails,
            setProductsDetails,
            isProductDetailsOpen
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopProvider}