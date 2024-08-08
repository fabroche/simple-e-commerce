import React, {useContext} from 'react';
import {Layout} from "../../Components/Layout";
import {Card} from "../../Components/Card";
import {ShopContext} from "../../Context/index.jsx";
import {ProductDetails} from "../../Components/ProductDetails/index.jsx";

function Home() {
    const {
        products,
        loading,
        filteredProducts,
        search,
        setSearch
    } = useContext(ShopContext);

    const emptyProduct = {
        title: '',
        price: 0,
        category: '',
        image: ''
    }

    return (
        <Layout>
            <h1 className="font-medium text-xl mb-2">Exclusive Products</h1>
            <input
                className="rounded-lg border border-black w-80 p-2 pl-4 pr-4 mb-6 focus:outline-none"
                type="text"
                placeholder="Search a product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-4 gap-4 w-full max-w-screen-lg">

                {loading && [...Array(16)].map((_, index) => (
                    <Card
                        key={index}
                        product={emptyProduct}
                    />
                ))}

                {filteredProducts?.map(product => (
                    <Card
                        key={product.id}
                        product={product}
                    />
                ))}
                <ProductDetails/>
            </div>
        </Layout>
    );
}

export {Home};