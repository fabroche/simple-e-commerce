import {createContext, useEffect, useState} from "react";

const ShopContext = createContext();

function ShopProvider({children}) {
    const [products, setProducts] = useState([]);
    const [productsDetails, setProductsDetails] = useState({});
    const [shoppingCartProducts, setShoppingCartProducts] = useState([])
    const [shoppingCartTotalPrice, setShoppingCartTotalPrice] = useState(0)
    const [isMyOrderOpen, setIsMyOrderOpen] = useState()

    // Estados derivados
    const isProductDetailsOpen = Object.keys(productsDetails).length > 0
    const shoppingCartCount = shoppingCartProducts.length
    const shoppingCartTotal = shoppingCartProducts.reduce((total, product) => total + product.price, 0)

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

    useEffect(() => {
       setShoppingCartTotalPrice(calculateShoppingCartTotalPrice())
    }, [shoppingCartProducts]);


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
            productsDetails,
            setProductsDetails,
            isProductDetailsOpen,
            shoppingCartCount,
            shoppingCartTotal,
            shoppingCartTotalPrice,
            setShoppingCartTotalPrice,
            calculateShoppingCartTotalPrice,
            shoppingCartProducts,
            setShoppingCartProducts,
            isMyOrderOpen,
            setIsMyOrderOpen,
            removeShoppingCartProduct,
            handleShoppingCart,
            isProductInCart,
            showProductDetails
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopProvider}