import React from 'react';
import {format} from "@formkit/tempo";
import {PriceCurrency} from "../PriceCurrency/index.jsx";
import {ShoppingCartIcon} from "@heroicons/react/16/solid/index.js";

function MyOrderCard({order: {date, total, products}}) {

    const totalProducts = Object.values(products).reduce((total, product) => total + product.quantity, 0)

    return (
        <div className="flex-1 gap-8 flex justify-between items-center border border-black p-2 pl-4 pr-4 rounded-lg w-full h-full min-w-full">
            <div className="flex flex-col">
            <ShoppingCartIcon
                className="w-6 h-full cursor-pointer"
            />
            <span className="text-black font-medium">
                        {`${format(date, 'short')} - ${format(date, {time: 'short'})}`}
            </span>
            <span>Products Amount: <span className="text-black font-medium">{totalProducts}</span></span>
            </div>

            <span className="relative">
                <span className="text-2xl font-medium">{total}<PriceCurrency currency={'€'}/></span>
            </span>
        </div>
    );
}

export {MyOrderCard};