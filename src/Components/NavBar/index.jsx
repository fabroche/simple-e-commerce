import React, {useContext} from 'react';
import './NavBar.css'
import {NavLink} from "react-router-dom";
import {ShopContext} from "../../Context/index.jsx";
import {ShoppingBagIcon} from "@heroicons/react/16/solid/index.js";


function NavBar() {
    const activeStyle = "underline";
    const {
        categories,
        shoppingCartCount,
        setIsMyOrderOpen
    } = useContext(ShopContext);

    return (
        <nav
            className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex justify-between items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink
                        to='/'
                    >
                        Lootify
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        className={
                            ({isActive}) =>
                                isActive
                                    ? activeStyle
                                    : undefined
                        }
                    >
                        All
                    </NavLink>
                </li>
                {
                    categories?.map(category => (
                        <li key={category}>
                            <NavLink
                                key={category}
                                to={`/${category.replace(' ', '-')}`}
                                className={
                                    ({isActive}) =>
                                        isActive
                                            ? activeStyle
                                            : undefined
                                }
                            >
                                {category[0].toUpperCase() + category.slice(1)}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <ul className="flex justify-between items-center gap-3">
                <li className="font-light text-lg text-gray-400">
                    fabroche@mail.com
                </li>
                <li>
                    <NavLink
                        to='/my-orders'
                        className={
                            ({isActive}) =>
                                isActive
                                    ? activeStyle
                                    : undefined
                        }
                    >
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/my-account'
                        className={
                            ({isActive}) =>
                                isActive
                                    ? activeStyle
                                    : undefined
                        }
                    >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/Sign-in'
                        className={
                            ({isActive}) =>
                                isActive
                                    ? activeStyle
                                    : undefined
                        }
                    >
                        Sign In
                    </NavLink>
                </li>
                <li
                    className="flex justify-center items-center"
                >
                    <ShoppingBagIcon
                        onClick={() => setIsMyOrderOpen(true)}
                        className="w-6 h-full cursor-pointer"
                    />
                    <span className="select-none">{shoppingCartCount}</span>
                </li>
            </ul>
        </nav>
    );
}

export {NavBar};