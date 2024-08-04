import React, {useContext} from 'react';
import './CheckoutSideMenu.css';
import {XCircleIcon} from "@heroicons/react/24/solid";
import {ShopContext} from "../../Context/index.jsx";
import {OrderCard} from "../OrderCard";

function CheckoutSideMenu() {

    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        shoppingCartTotalPrice,
        isMyOrderOpen,
        setIsMyOrderOpen,
    } = useContext(ShopContext);

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
                className="flex flex-col gap-4 p-6"
            >
                <h2 className="text-xl font-medium">My Orders</h2>

                {shoppingCartProducts.length === 0 && <p className="text-black-500 text-center">No products in cart</p>}
                {
                    shoppingCartProducts?.map(product => (
                        <OrderCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
                <button
                    className="relative w-fit self-center p-1 pr-4 pl-4 font-medium text-xl rounded-lg border border-black bg-black text-white text-center"
                >
                    Checkout: {shoppingCartTotalPrice}
                    <span className="absolute top-0 text-xs">€</span>
                </button>
            </div>
        </aside>
    );
}

export {CheckoutSideMenu};