import React, {useContext} from 'react';
import './ProductDetails.css';
import {XCircleIcon} from "@heroicons/react/24/solid";
import {ShopContext} from "../../Context/index.jsx";

function ProductDetails() {

    const {
        productsDetails,
        setProductsDetails,
        isProductDetailsOpen,
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
                    <h3 className="relative font-medium text-2xl">
                        {productsDetails?.price.toFixed(2)}
                        <span className="absolute top-0 text-xs">€</span>
                    </h3>
                    <p className="font-semibold">{productsDetails?.title}</p>
                    <p>{productsDetails?.description}</p>
                </div>
            </figure>
        </aside>
    );
}

export {ProductDetails};