import {createContext, useEffect, useState} from "react";
import {format, addDay} from "@formkit/tempo";
import {useLocalStorage} from "../CustomHooks/UseLocalStorage.jsx";

const ShopContext = createContext();

function ShopProvider({children}) {
    //API
    const apiUrl = 'https://fakestoreapi.com'
    const options = {
        headers: {
            cors: 'no-cors'
        }
    }

    // Responsive
    const screenWidth = window.innerWidth

    // Estados
    // Products
    const [products, setProducts] = useState([]);
    const [productsDetails, setProductsDetails] = useState({});
    const [filteredProductsCategories, setFilteredProductsCategories] = useState(location.href.split('/').slice(-1)[0].replace('-', ' '))
    // Shopping Cart
    const [shoppingCartProducts, setShoppingCartProducts] = useState([])
    const [shoppingCartTotalPrice, setShoppingCartTotalPrice] = useState(0)
    const [shoppingCartCount, setShoppingCartCount] = useState(0)
    // Orders
    const [orders, setOrders] = useLocalStorage('my-orders', [])
    const [isMyOrderOpen, setIsMyOrderOpen] = useState()
    // Categories
    const [categories, setCategories] = useState([])
    // Search
    const [search, setSearch] = useState('')
    // Loading and error States
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // NavBar
    const [isNavBarOpen, setIsNavBarOpen] = useState(false)
    // Authentication
    const [account, setAccount] = useLocalStorage('account', {})
    const [signOut, setSignOut] = useLocalStorage('sign-out', true)

    // Estados derivados
    const isProductDetailsOpen = Object.keys(productsDetails).length > 0
    const shoppingCartTotal = shoppingCartProducts.reduce((total, product) => total + product.price, 0)
    const filteredProducts = products.filter(product => filteredProductsCategories !== ''
        ? product.title.toLowerCase().includes(search.toLowerCase()) && product.category === filteredProductsCategories
        : product.title.toLowerCase().includes(search.toLowerCase())
    )

    const ordersOwner = orders.filter(orders => orders.owner === account.name)
    const isSignUp = Object.keys(account).length > 0
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
    // Products
    function showProductDetails(product) {
        if (isMyOrderOpen) {
            setIsMyOrderOpen(false)
        }
        setProductsDetails(product)
    }

    function isProductInCart(product) {
        return shoppingCartProducts.includes(product)
    }

    // Shopping Cart
    function removeShoppingCartProduct(product) {
        setShoppingCartProducts(shoppingCartProducts.filter(item => item !== product))
    }

    function handleShoppingCart(product) {
        if (!isMyOrderOpen && screenWidth > 768) {
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

    function updateCartCount() {
        setShoppingCartCount(shoppingCartProducts.reduce((total, product) =>total + Number(document.getElementById(`${product.id}-quantity`).innerText), 0))
    }

    // Utils
    function setLazyLoading() {
        const productsListContainerElement = document.getElementById('productsList-container')
        productsListContainerElement?.childNodes.forEach(productContainer => {
            if (productContainer.nodeName === 'DIV' ) imageLazyLoadingObserver.observe(productContainer)
        })
    }

    function obtenerFechaActual() {

        return addDay(new Date(), 1).toISOString();
    }

    // Effects

    //Product
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                setLoading(true)
                const response = await fetch(`${apiUrl}/products/`,options);
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

    // Shopping Cart
    useEffect(() => {
        updateCartCount()
    }, [shoppingCartProducts]);

    useEffect(() => {
        setShoppingCartTotalPrice(calculateShoppingCartTotalPrice())
    }, [shoppingCartProducts]);

    // Categories
    useEffect(() => {
        try {
            const fetchProductsCategories = async () => {
                setLoading(true)
                const response = await fetch(`${apiUrl}/products/categories`, options);
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

    // Orders
    useEffect(() => {
        setOrders(orders.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }, [orders]);


    return (
        <ShopContext.Provider value={{
            // Products
            products,
            filteredProducts,
            setProducts,
            productsDetails,
            setProductsDetails,
            isProductDetailsOpen,
            showProductDetails,
            // Shopping Cart
            shoppingCartCount,
            shoppingCartTotal,
            shoppingCartTotalPrice,
            setShoppingCartTotalPrice,
            calculateShoppingCartTotalPrice,
            shoppingCartProducts,
            setShoppingCartProducts,
            removeShoppingCartProduct,
            handleShoppingCart,
            isProductInCart,
            updateCartCount,
            // Categories
            categories,
            setCategories,
            filteredProductsCategories,
            setFilteredProductsCategories,
            // Orders
            orders,
            setOrders,
            ordersOwner,
            isMyOrderOpen,
            setIsMyOrderOpen,
            // Search
            search,
            setSearch,
            // Observers
            imageLazyLoadingObserver,
            setLazyLoading,
            // Estados de carga y error
            loading,
            setLoading,
            error,
            setError,
            // Responsive
            screenWidth,
            // Util Functions
            obtenerFechaActual,
            // NavBar
            isNavBarOpen,
            setIsNavBarOpen,
            // Authentication
            account,
            setAccount,
            signOut,
            setSignOut,
            isSignUp
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopProvider}