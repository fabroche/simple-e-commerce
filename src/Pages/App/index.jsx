import './App.css'
import {Home} from "../Home";
import {MyAccount} from "../MyAccount";
import {MyOrders} from "../MyOrders";
import {MyOrder} from "../MyOrder";
import {NotFound} from "../NotFound";
import {Signin} from "../Signin";
import {NavBar} from "../../Components/NavBar";

import {useRoutes} from "react-router-dom";
import {ShopContext, ShopProvider} from "../../Context/index.jsx";
import {CheckoutSideMenu} from "../../Components/CheckoutSideMenu/index.jsx";
import React, {useContext} from "react";

function App() {
    const AppRoutes = () => {

        const {
            categories
        } = useContext(ShopContext);

        const categoriesRoutes = categories?.map(category => {
            return {
                path: `/${category.replace(' ', '-')}`,
                element: <Home/>
            }
        })

        return useRoutes([
            {path: '/', element: <Home/>},
            ...categoriesRoutes,
            {path: '/my-account', element: <MyAccount/>},
            {path: '/my-orders', element: <MyOrders/>},
            {path: '/my-order/:index', element: <MyOrder/>},
            {path: '/my-order/last', element: <MyOrder/>},
            {path: '/*', element: <NotFound/>},
            {path: '/sign-in', element: <Signin/>},
        ])
    }


    return (
        <>
            <ShopProvider>
                <NavBar/>
                <AppRoutes/>
                <CheckoutSideMenu/>
            </ShopProvider>
        </>
    )
}

export {App};
