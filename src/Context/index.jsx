import {createContext, useEffect, useState} from "react";
import {format, addDay} from "@formkit/tempo";
import {useLocalStorage} from "../CustomHooks/UseLocalStorage.jsx";

const ShopContext = createContext();

function ShopProvider({children}) {
    //API
    const apiUrl = 'https://fakestoreapi.com'

    // Estados
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
    const [filteredProductsCategories, setFilteredProductsCategories] = useState(location.href.split('/').slice(-1)[0].replace('-', ' '))
    const [shoppingCartCount, setShoppingCartCount] = useState(0)

    // Estados derivados
    const isProductDetailsOpen = Object.keys(productsDetails).length > 0
    const shoppingCartTotal = shoppingCartProducts.reduce((total, product) => total + product.price, 0)
    const filteredProducts = products.filter(product => filteredProductsCategories !== ''
        ? product.title.toLowerCase().includes(search.toLowerCase()) && product.category === filteredProductsCategories
        : product.title.toLowerCase().includes(search.toLowerCase())
    )

    function updateCartCount() {
        setShoppingCartCount(shoppingCartProducts.reduce((total, product) =>total + Number(document.getElementById(`${product.id}-quantity`).innerText), 0))
    }

    useEffect(() => {
        updateCartCount()
    }, [shoppingCartProducts]);

    // Observers

    // callbacks
    const imageObserver = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.target.classList.contains('card--loading')) return
            if (entry.isIntersecting) {
                entry.target.children[0].children[1].src = entry.target.children[0].children[1].getAttribute('data-src')
                observer.unobserve(entry.target)
            }
        })
    }

    const imageObserverOptions = {
        threshold: 0
    }

    const imageLazyLoadingObserver = new IntersectionObserver(imageObserver, imageObserverOptions)


    //Functions

    function setLazyLoading() {
        const productsListContainerElement = document.getElementById('productsList-container')
        productsListContainerElement?.childNodes.forEach(productContainer => {
            if (productContainer.nodeName === 'DIV' ) imageLazyLoadingObserver.observe(productContainer)
        })
    }

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
            filteredProductsCategories,
            setFilteredProductsCategories,
            orders,
            setOrders,
            search,
            setSearch,
            imageLazyLoadingObserver,
            setLazyLoading,
            shoppingCartProducts,
            setShoppingCartProducts,
            isMyOrderOpen,
            setIsMyOrderOpen,
            loading,
            removeShoppingCartProduct,
            handleShoppingCart,
            isProductInCart,
            updateCartCount,
            showProductDetails,
            obtenerFechaActual
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopProvider}