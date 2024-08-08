import React, {useContext, useEffect, useState} from 'react';
import {PlusIcon, MinusIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {ShopContext} from "../../Context/index.jsx";
import {PriceCurrency} from "../PriceCurrency/index.jsx";

function OrderCard({product, isCheckout = false}) {

    const {id, title, image, price} = product

    const [quantity, setQuantity] = useState(1);


    const {
        removeShoppingCartProduct,
        setShoppingCartTotalPrice,
        calculateShoppingCartTotalPrice,
    } = useContext(ShopContext);

    useEffect(() => {
        setShoppingCartTotalPrice(calculateShoppingCartTotalPrice());
    }, [quantity]);

    return (
        <div
            className={`flex justify-between items-center gap-2 relative ${isCheckout ? 'p-2' : 'p-2'}`}
        >
            {!isCheckout && <XMarkIcon
                className="w-4 h-4 cursor-pointer text-black-500 min-w-2 absolute top-0 right-0"
                onClick={() => removeShoppingCartProduct(product)}
            />}

            <div className="flex items-center gap-2">
                <figure className="w-20 h-20 relative">
                    <img
                        className="w-full h-full rounded-lg object-cover"
                        src={image}
                        alt={title}
                    />
                    <span
                        id={`${id}-quantity`}
                        className="absolute -right-1 -bottom-1 rounded-lg w-4 h-4 bg-black text-white text-xs flex justify-center items-center"
                    >{isCheckout ? product.quantity : quantity}</span>
                </figure>
                <p className="text-sm font-light w-2/3">{title}</p>
            </div>

            <div className="flex flex-col items-center">
                {!isCheckout && <div className="flex items-end justify-between gap-1 mt-8">
                    <button
                        className="rounded-lg text-black"
                        onClick={() => quantity === 1 ? quantity : setQuantity(quantity - 1)}
                    >
                        <MinusIcon
                            className="w-4 h-4 cursor-pointer min-w-2 bg-transparent border border-black rounded-lg"
                        />
                    </button>
                    <button
                        className="bg-black rounded-lg text-white"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <PlusIcon
                            className="w-4 h-4 cursor-pointer min-w-2 bg-transparent"
                        />
                    </button>

                </div>}
                <p
                    id={`${id}-price`}
                    className="text-lg font-medium relative"
                >{Number(quantity * price).toFixed(2)}<PriceCurrency currency={"€"}/></p>

            </div>
        </div>
    );
}

export {OrderCard};