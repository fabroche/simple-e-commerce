import './App.css'
import {Home} from "../Home";
import {MyAccount} from "../MyAccount";
import {MyOrders} from "../MyOrders";
import {MyOrder} from "../MyOrder";
import {NotFound} from "../NotFound";
import {Signin} from "../Signin";

import {useRoutes, BrowserRouter} from "react-router-dom";

function App() {
    const AppRoutes = () => {

        return useRoutes([
            {path: '/', element: <Home/>},
            {path: '/my-account', element: <MyAccount/>},
            {path: '/my-orders', element: <MyOrders/>},
            {path: '/my-order', element: <MyOrder/>},
            {path: '/*', element: <NotFound/>},
            {path: '/signin', element: <Signin/>},
        ])
    }


    return (
        <AppRoutes/>
    )
}

export {App};
