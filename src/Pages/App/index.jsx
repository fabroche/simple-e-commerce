import './App.css'
import {Home} from "../Home";
import {MyAccount} from "../MyAccount";
import {MyOrders} from "../MyOrders";
import {MyOrder} from "../MyOrder";
import {NotFound} from "../NotFound";
import {Signin} from "../Signin";
import {NavBar} from "../../Components/NavBar";

import {Navigate, useRoutes} from "react-router-dom";
import {ShopContext, ShopProvider} from "../../Context/index.jsx";
import {CheckoutSideMenu} from "../../Components/CheckoutSideMenu/index.jsx";
import React, {useContext, useEffect} from "react";

function App() {
    const AppRoutes = () => {

        const {
            categories,
            isAuthenticate
        } = useContext(ShopContext);

        const categoriesRoutes = categories?.map(category => {
            return {
                path: `/${category.replace(' ', '-')}`,
                element: <Home/>
            }
        })

        return useRoutes([
            {path: '/', element: <Home/>},
            {path: '/electronics', element: <Home/>},
            {path: '/jewelery', element: <Home/>},
            {path: '/men\'s-clothing', element: <Home/>},
            {path: '/women\'s-clothing', element: <Home/>},
            // ...categoriesRoutes,
            {path: '/my-account', element: isAuthenticate ? <MyAccount/> : <Navigate replace={true} to={'/sign-in'}/>},
            {path: '/my-orders', element: isAuthenticate ? <MyOrders/> : <Navigate replace={true} to={'/sign-in'}/>},
            {path: '/my-order/:index', element: isAuthenticate ? <MyOrder/> : <Navigate replace={true} to={'/sign-in'}/>},
            {path: '/my-order/last', element: isAuthenticate ? <MyOrder/> : <Navigate replace={true} to={'/sign-in'}/>},
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
