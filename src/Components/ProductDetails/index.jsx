import React, {useContext} from 'react';
import './ProductDetails.css';
import {XCircleIcon} from "@heroicons/react/24/solid";
import {ShopContext} from "../../Context/index.jsx";
import {PriceCurrency} from "../PriceCurrency/index.jsx";
import {CheckIcon, PlusIcon} from "@heroicons/react/16/solid/index.js";

function ProductDetails() {

    const {
        productsDetails,
        setProductsDetails,
        isProductDetailsOpen,
        isProductInCart,
        handleShoppingCart
    } = useContext(ShopContext);

    return (
        <aside
            id="product-details"
            className={`product-details ${isProductDetailsOpen ? 'product-details--active' : ''} flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
        >
                <XCircleIcon
                    className="w-6 h-6 cursor-pointer text-black-500 min-w-6 absolute top-0 right-0 m-4"
                    onClick={() => setProductsDetails({})}
                >X
                </XCircleIcon>
            <figure
                className="w-full h-1/2"
            >
                <img
                    className="p-6 w-full h-full object-contain rounded-lg"
                    src={productsDetails?.image}
                    alt={productsDetails?.title}
                />
                <div className="p-6 flex flex-col gap-2">
                    <h3 className="relative flex justify-between items-center font-medium text-2xl">
                        <span>
                        {Number(productsDetails?.price).toFixed(2)}
                            <PriceCurrency currency={"€"}/>
                        </span>

                        <button
                            className={`${isProductInCart(productsDetails) ? 'bg-white text-black' : 'bg-black text-white'} flex justify-center items-center w-fit h-6 rounded-lg border border-black p-4 text-sm`}
                        >
                            {isProductInCart(productsDetails)
                                ? <p
                                    onClick={() => handleShoppingCart(productsDetails)}
                                    className='w-full h-6'
                                >Remove from cart</p>

                                : <p
                                    onClick={() => handleShoppingCart(productsDetails)}
                                    className='w-full h-6'
                                >Add to cart</p>
                            }
                        </button>
                    </h3>
                    <p className="font-semibold">{productsDetails?.title}</p>
                    <p>{productsDetails?.description}</p>
                </div>
            </figure>
        </aside>
    );
}

export {ProductDetails};