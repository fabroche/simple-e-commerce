import React, {useContext} from 'react';
import {Layout} from "../../Components/Layout/index.jsx";
import {OrderCard} from "../../Components/OrderCard/index.jsx";
import {ShopContext} from "../../Context/index.jsx";
import {PriceCurrency} from "../../Components/PriceCurrency/index.jsx";
import {format,} from "@formkit/tempo";
import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/24/solid/index.js";

function MyOrder(props) {

    const {
        orders,
    } = useContext(ShopContext);

    const isLastOrderRoute = location.href.includes('/my-order/last')
    const orderIndex = location.href.split('/').slice(-1)[0]

    let order;

    isLastOrderRoute ? order = orders?.slice(0)[0] : order = orders[orderIndex]


    return (
        <Layout>
            <div
                id="order-container"
                className="flex flex-col gap-4 p-6 w-full max-w-screen-lg"
            >

                <h2 className="flex justify-between items-center text-xl font-medium">
                    <Link to='/my-orders'>
                        <ChevronLeftIcon className="w-6 h-6 text-black cursor-pointer"/>
                    </Link>
                    {isLastOrderRoute || orders.indexOf(order) === 0 ? 'My Last Order' : 'My Order'}
                    <span className="relative">
                        {`${format(order?.date, 'short')} - ${format(order?.date, {time: 'short'})}`}
                    </span>
                </h2>

                {orders.length === 0 &&
                    <p className="text-black-500 text-center flex-1">
                        No products in cart
                    </p>}

                <div
                    id="shoppingCart-products-container"
                    className="flex flex-col gap-4 overflow-hidden overflow-y-scroll max-h-96 pl-2 pr-2">
                    {
                        Object.values(order.products).map(product => (
                            <OrderCard
                                key={product.id}
                                product={product}
                                isCheckout={true}
                            />
                        ))
                    }
                </div>
                <h3 className="flex justify-between items-center text-lg font-medium border border-black p-2 pl-4 pr-4 rounded-lg bg-white">
                    Order Total: <span className="relative">{order.total}<PriceCurrency currency={"€"}/></span></h3>
            </div>
        </Layout>
    );
}

export {
    MyOrder
};