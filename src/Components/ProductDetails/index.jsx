import React, {useContext} from 'react';
import './ProductDetails.css';
import {XCircleIcon} from "@heroicons/react/24/solid";
import {ShopContext} from "../../Context/index.jsx";

function ProductDetails() {

    const {
        productsDetails,
        setProductsDetails,
        isProductDetailsOpen
    } = useContext(ShopContext);

    return (
        <aside
        className={`product-details ${isProductDetailsOpen ? 'product-details--active' : ''} flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
        >
            <div
            className="flex justify-between items-center p-6"
            >
                <h2
                className="font-medium text-2xl mt-6"
                >{productsDetails?.title}</h2>

                <XCircleIcon
                className="w-6 h-6 cursor-pointer text-black-500 min-w-6 absolute top-0 right-0 m-4"
                onClick={() => setProductsDetails({})}
                >X
                </XCircleIcon>
            </div>
        </aside>
    );
}

export {ProductDetails};