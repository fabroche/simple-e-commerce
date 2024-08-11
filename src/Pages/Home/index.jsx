import React, {useContext, lazy, Suspense, useEffect} from 'react';
import './Home.css'
import {Layout} from "../../Components/Layout";
import {Card} from "../../Components/Card";
import {ShopContext} from "../../Context/index.jsx";
import {ProductDetails} from "../../Components/ProductDetails/index.jsx";
import {ShoppingBagIcon} from "@heroicons/react/16/solid/index.js";

function Home() {

    const {
        screenWidth,
        shoppingCartCount,
        loading,
        filteredProducts,
        search,
        setSearch,
        setIsNavBarOpen,
        setIsMyOrderOpen

    } = useContext(ShopContext);

    const emptyProduct = {
        title: '',
        price: 0,
        category: '',
        image: ''
    }

    return (
        <Layout>
            <h1 className="font-medium text-xl mb-2">Looti Products</h1>
            <input
                className="rounded-lg border border-black w-full max-w-80 p-2 pl-4 pr-4 mb-6 focus:outline-none items-center justify-center"
                type="text"
                placeholder="Search a product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div
                id="productsList-container"
                className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 w-full max-w-screen-lg"
            >
                {loading && [...Array(16)].map((_, index) => (
                    <Card
                        key={index}
                        product={emptyProduct}
                    />
                ))}

                {filteredProducts.length > 0 ?
                    filteredProducts?.map(product => (
                        <Card
                            key={product.id}
                            product={product}
                        />
                    ))
                    : <p className="no-coincidences-text">There is not coincidences</p>
                }
                <ProductDetails/>
            </div>
            {shoppingCartCount > 0 && <div
                id="mobile-shoppingCart-btn"
                className="mobile-floating-shoppingCart-btn fixed bottom-4 right-4 w-12 h-12 border border-black bg-black text-white rounded-full cursor-pointer select-none">
                <div
                    className=" relative w-full h-full p-2"
                >
                    <ShoppingBagIcon
                        onClick={() => {
                            setIsNavBarOpen(false)
                            setIsMyOrderOpen(true)
                        }}
                        className="w-full h-full z-40"
                    />
                    <span
                        className="absolute w-6 h-6 -top-2 right-0 text-white bg-black rounded-full text-center">{shoppingCartCount}</span>
                </div>
            </div>}

        </Layout>
    );
}

export {Home};