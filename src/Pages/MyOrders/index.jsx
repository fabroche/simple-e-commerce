import React, {useContext} from 'react';
import './MyOrders.css'
import {Layout} from "../../Components/Layout";
import {ShopContext} from "../../Context/index.jsx";
import {MyOrderCard} from "../../Components/MyOrderCard/index.jsx";
import {Link} from "react-router-dom";

function MyOrders() {

    const {ordersOwner} = useContext(ShopContext);

    return (
        <Layout>
            <h1 className="mb-6 text-lg font-medium">MyOrders</h1>
            <div className="orders-list-container flex gap-4 justify-center items-center flex-wrap mb-2">
                {ordersOwner.length === 0 && <p>There is not orders yet</p>}

                {ordersOwner.map((order, index) => (
                    <Link key={index} to={`/my-order/${index}`} className="w-full">
                        <MyOrderCard
                            key={order.date}
                            order={order}
                        />
                    </Link>

                ))}
            </div>
        </Layout>
    );
}

export {MyOrders};