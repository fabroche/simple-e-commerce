import './App.css'
import {Home} from "../Home";
import {MyAccount} from "../MyAccount";
import {MyOrders} from "../MyOrders";
import {MyOrder} from "../MyOrder";
import {NotFound} from "../NotFound";
import {Signin} from "../Signin";
import {NavBar} from "../../Components/NavBar";

import {useRoutes} from "react-router-dom";
import {ShopProvider} from "../../Context/index.jsx";

function App() {
    const AppRoutes = () => {

        return useRoutes([
            {path: '/', element: <Home/>},
            {path: '/my-account', element: <MyAccount/>},
            {path: '/my-orders', element: <MyOrders/>},
            {path: '/my-order', element: <MyOrder/>},
            {path: '/*', element: <NotFound/>},
            {path: '/sign-in', element: <Signin/>},
        ])
    }


    return (
        <>
            <ShopProvider>
                <NavBar/>
                <AppRoutes/>
            </ShopProvider>
        </>
    )
}

export {App};
