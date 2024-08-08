import {createContext, useEffect, useState} from "react";
import {format, addDay} from "@formkit/tempo";
import {useLocalStorage} from "../CustomHooks/UseLocalStorage.jsx";

const ShopContext = createContext();

function ShopProvider({children}) {
    //API
    const apiUrl = 'https://fakestoreapi.com'

    const [products, setProducts] = useState([]);
    const [productsDetails, setProductsDetails] = useState({});
    const [shoppingCartProducts, setShoppingCartProducts] = useState([])
    const [shoppingCartTotalPrice, setShoppingCartTotalPrice] = useState(0)
    const [isMyOrderOpen, setIsMyOrderOpen] = useState()
    const [orders, setOrders] = useLocalStorage('my-orders', [])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState([])

    // Estados derivados
    const isProductDetailsOpen = Object.keys(productsDetails).length > 0
    const shoppingCartCount = shoppingCartProducts.length
    const shoppingCartTotal = shoppingCartProducts.reduce((total, product) => total + product.price, 0)
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    //Functions

    function showProductDetails(product) {
        if (isMyOrderOpen) {
            setIsMyOrderOpen(false)
        }
        setProductsDetails(product)
    }

    function removeShoppingCartProduct(product) {
        setShoppingCartProducts(shoppingCartProducts.filter(item => item !== product))
    }

    function isProductInCart(product) {
        return shoppingCartProducts.includes(product)
    }

    function handleShoppingCart(product) {
        if (!isMyOrderOpen) {
            setIsMyOrderOpen(true)
        }
        if (isProductInCart(product)) {
            setShoppingCartProducts(shoppingCartProducts.filter(item => item !== product))
        } else {
            setShoppingCartProducts([...shoppingCartProducts, product])
        }
    }

    function calculateShoppingCartTotalPrice() {
        return shoppingCartProducts.reduce((total, product) => total + parseFloat(document.getElementById(`${product.id}-price`).innerText.split('€')[0]), 0).toFixed(2)
    }

    function obtenerFechaActual() {

        return addDay(new Date(), 1).toISOString();
    }


    useEffect(() => {
        setShoppingCartTotalPrice(calculateShoppingCartTotalPrice())
    }, [shoppingCartProducts]);


    useEffect(() => {
        try {
            const fetchProducts = async () => {
                setLoading(true)
                const response = await fetch(`${apiUrl}/products/`);
                const data = await response.json();
                setProducts(data);
                setLoading(false)
            };
            fetchProducts()
        } catch (error) {
            setLoading(false)
            setError(true)
        }

    }, []);

    useEffect(() => {
        try {
            const fetchProductsCategories = async () => {
                setLoading(true)
                const response = await fetch(`${apiUrl}/products/categories`);
                const data = await response.json();
                setCategories(data);
                setLoading(false)
            };
            fetchProductsCategories()
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }, []);


    useEffect(() => {
        setOrders(orders.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }, [orders]);

    return (
        <ShopContext.Provider value={{
            products,
            filteredProducts,
            setProducts,
            productsDetails,
            setProductsDetails,
            isProductDetailsOpen,
            shoppingCartCount,
            shoppingCartTotal,
            shoppingCartTotalPrice,
            setShoppingCartTotalPrice,
            calculateShoppingCartTotalPrice,
            categories,
            setCategories,
            orders,
            setOrders,
            search,
            setSearch,
            shoppingCartProducts,
            setShoppingCartProducts,
            isMyOrderOpen,
            setIsMyOrderOpen,
            loading,
            removeShoppingCartProduct,
            handleShoppingCart,
            isProductInCart,
            showProductDetails,
            obtenerFechaActual
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopProvider}