import React, {useContext} from 'react';
import {ShopContext} from "../../Context/index.jsx";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import './Card.css'

function Card({product}) {
    const {category, image, title, price} = product;

    const {
        shoppingCartCount,
        setShoppingCartCount,
        setProductsDetails
    } = useContext(ShopContext);

    return (
        <div
            onClick={() =>setProductsDetails(product)}
            className="bg-white cursor-pointer w-56 h-60 rounded-lg p-1 hover:scale-105 transition:all duration-200 ease">
            <figure
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
                <button
                    className="absolute top-0 right-0 m-2 p-1 flex justify-center items-center bg-white w-6 h-6 rounded-full border border-black text-sm"
                    onClick={() => setShoppingCartCount(shoppingCartCount + 1)}
                >
                    <PlusIcon className="w-6 h-6"/>
                </button>
            </figure>
            <p className="flex justify-between items-baseline">
                <span className="text-sm font-light truncate m-2">{title}</span>
                <span className="text-lg font-medium text-nowrap"> $ {price}</span>
            </p>
        </div>
    );
}

export {Card};