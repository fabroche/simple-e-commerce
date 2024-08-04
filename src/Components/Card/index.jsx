import React, {useContext} from 'react';
import {ShopContext} from "../../Context/index.jsx";
import {PlusIcon, CheckIcon} from "@heroicons/react/16/solid/index.js";
import './Card.css'

function Card({product}) {
    const {category, image, title, price} = product;

    const {
        isProductInCart,
        handleShoppingCart,
        showProductDetails
    } = useContext(ShopContext);

    return (
        <div
            className="relative bg-white cursor-pointer w-56 h-60 rounded-lg p-1 hover:scale-105 transition:all duration-200 ease">
            <figure
                onClick={() => showProductDetails(product)}
                className="relative mb-2 w-full h-4/5 border border-black rounded-lg"
            >
                <span
                    className="absolute bottom-0 left-0 m-2 px-3 py-0.5 bg-white/60 rounded-lg text-black text-xs"
                >{category}</span>
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={image}
                    alt={title}
                />
            </figure>
            <button
                className={`${isProductInCart(product) ? 'bg-black text-white' : 'bg-white text-black'} absolute top-0 right-0 m-2 p-1 flex justify-center items-center w-6 h-6 rounded-full border border-black text-sm`}
            >
                {isProductInCart(product)
                    ? <CheckIcon
                        onClick={() => handleShoppingCart(product)}
                        className='w-6 h-6'
                    />

                    : <PlusIcon
                        onClick={() => handleShoppingCart(product)}
                        className='w-6 h-6'
                    />
                }
            </button>
            <p className="flex justify-between items-baseline">
                <span className="text-sm font-light truncate m-2">{title}</span>
                <span className="relative text-lg font-medium text-nowrap">
                    {Number(price).toFixed(2)}
                    <span className="absolute top-0 text-xs">€</span>
                </span>
            </p>
        </div>
    );
}

export {Card};