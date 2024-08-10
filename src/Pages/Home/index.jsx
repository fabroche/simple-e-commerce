import React, {useContext, lazy, Suspense, useEffect} from 'react';
import './Home.css'
import {Layout} from "../../Components/Layout";
import {Card} from "../../Components/Card";
import {ShopContext} from "../../Context/index.jsx";
import {ProductDetails} from "../../Components/ProductDetails/index.jsx";

function Home() {

    const {
        loading,
        filteredProducts,
        search,
        setSearch,

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
        </Layout>
    );
}

export {Home};