import React, {useContext} from 'react';
import {Layout} from "../../Components/Layout";
import {Card} from "../../Components/Card";
import {ShopContext} from "../../Context/index.jsx";
import {ProductDetails} from "../../Components/ProductDetails/index.jsx";

function Home() {
    const {
        products,
    } = useContext(ShopContext);

    return (
        <Layout>
            <div className="grid grid-cols-4 gap-4 w-full max-w-screen-lg">
                {products?.map(product => (
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