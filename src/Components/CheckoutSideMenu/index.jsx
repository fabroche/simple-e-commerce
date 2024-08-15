import React, {useContext} from 'react';
import './CheckoutSideMenu.css';
import {XCircleIcon} from "@heroicons/react/24/solid";
import {ShopContext} from "../../Context/index.jsx";
import {OrderCard} from "../OrderCard";
import {Link, Navigate} from "react-router-dom";
import {PriceCurrency} from "../PriceCurrency/index.jsx";

function CheckoutSideMenu() {

    const {
        // Shopping Cart
        shoppingCartProducts,
        setShoppingCartProducts,
        shoppingCartTotalPrice,
        // Orders
        orders,
        setOrders,
        isMyOrderOpen,
        setIsMyOrderOpen,
        // Utils
        obtenerFechaActual,
        // Auth
        account,
        signOut,
        isSignUp,
        // Responsive
        screenWidth
    } = useContext(ShopContext);


    function handleCheckout() {

        if (isSignUp && !signOut) {
            const newOrder = shoppingCartProducts.reduce((diccionario, producto) => {
                const quantity = Number(document.getElementById(`${producto.id}-quantity`).innerText);
                const totalPrice = Number(quantity * producto.price).toFixed(2);
                diccionario[producto.title] = {...producto, quantity: quantity, totalPrice: Number(totalPrice)};
                return diccionario;
            }, {});

            const toAddOrder = {
                owner: account?.name,
                date: obtenerFechaActual(),
                products: newOrder,
                total: Number(shoppingCartTotalPrice)
            };

            setShoppingCartProducts([]);
            setIsMyOrderOpen(false);
            setOrders([...orders, toAddOrder]);
        } else {
            if (screenWidth <= 768) {
                setIsMyOrderOpen(false)
            }
        }
    }

    return (
        <aside
            id="checkout-side-menu"
            className={`checkout-side-menu ${isMyOrderOpen ? 'checkout-side-menu--active' : ''} flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
        >
            <XCircleIcon
                className="w-6 h-6 cursor-pointer text-black-500 min-w-6 absolute top-0 right-0 m-4"
                onClick={() => setIsMyOrderOpen(false)}
            >X
            </XCircleIcon>

            <div
                id="shoppingCart-container"
                className="flex flex-col gap-4 p-6 min-h-full"
            >
                <h2 className="text-xl font-medium">My Shopping Cart</h2>

                {shoppingCartProducts.length === 0 &&
                    <p className="text-black-500 text-center flex-1">No products in cart</p>}
                <div
                    id="shoppingCart-products-container"
                    className="flex-1 flex flex-col gap-4 overflow-hidden overflow-y-scroll pl-2 pr-2">
                    {
                        shoppingCartProducts?.map(product => (
                            <OrderCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    }
                </div>

                <Link to={signOut ? "/Sign-in" : "/my-order/last"}>
                    <button
                        onClick={() => handleCheckout()}
                        className="relative w-full p-1 pr-4 pl-4 font-medium text-xl rounded-lg border border-black bg-black text-white text-center"
                    >Checkout: {shoppingCartTotalPrice}<PriceCurrency currency={"€"}/>
                    </button>
                </Link>
            </div>
        </aside>
    );
}

export {CheckoutSideMenu};