import React, {useContext} from 'react';
import './NavBar.css'
import {NavLink} from "react-router-dom";
import {ShopContext} from "../../Context/index.jsx";
import {ShoppingBagIcon, ChevronUpDownIcon, Bars3Icon} from "@heroicons/react/16/solid/index.js";
import {XCircleIcon} from "@heroicons/react/24/solid/index.js";


function NavBar() {
    const activeStyle = "underline";
    const {
        categories,
        shoppingCartCount,
        screenWidth,
        isNavBarOpen,
        setIsNavBarOpen,
        setIsMyOrderOpen,
        setFilteredProductsCategories
    } = useContext(ShopContext);

    return (
        <nav
            className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex justify-between items-center gap-3">
                {/*Filters for tablets and upper*/}
                <li className="font-semibold text-lg">
                    <NavLink
                        to='/'
                        onClick={() => setFilteredProductsCategories('')}
                    >
                        Lootify
                    </NavLink>
                </li>
                {screenWidth > 768 && <li>
                    <NavLink
                        to='/'
                        className={
                            ({isActive}) =>
                                isActive
                                    ? activeStyle
                                    : undefined
                        }
                        onClick={() => setFilteredProductsCategories('')}
                    >
                        All
                    </NavLink>
                </li>}
                {
                    screenWidth > 768 && categories?.map(category => (
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
                                onClick={() => setFilteredProductsCategories(category)}
                            >
                                {category[0].toUpperCase() + category.slice(1)}
                            </NavLink>
                        </li>
                    ))
                }

                {/*Filters for mobile*/}
                {screenWidth <= 768 &&
                    <li
                        id="filter-categories-mobile"
                        className="relative flex justify-between items-center gap-3 "
                    >
                        <span
                            className="flex justify-between items-center cursor-pointer select-none">Filters <ChevronUpDownIcon
                            className="w-4 h-4"/></span>
                        <ul className="filters-container absolute flex flex-col gap-2 top-6 bg-white rounded-lg border border-black p-6 transition-all duration-200 ease">
                            <li>
                                <NavLink
                                    to='/'
                                    className={
                                        ({isActive}) =>
                                            isActive
                                                ? activeStyle
                                                : undefined
                                    }
                                    onClick={() => setFilteredProductsCategories('')}
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
                                            onClick={() => setFilteredProductsCategories(category)}
                                        >
                                            {category[0].toUpperCase() + category.slice(1)}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                    </li>}
            </ul>
            <ul className="flex justify-between items-center gap-3">
                {/*Screen < 768px*/}
                {screenWidth < 768 && <>
                    <Bars3Icon
                        className="w-6 h-6"
                        onClick={() => setIsNavBarOpen(true)}
                    />
                    <aside
                        id="mobile-navbar"
                        className={`mobile-aside-navbar ${isNavBarOpen ? 'mobile-aside-navbar--active' : ''} flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
                    >
                        <XCircleIcon
                            className="w-6 h-6 cursor-pointer text-black-500 min-w-6 absolute top-0 right-0 m-4"
                            onClick={() => setIsNavBarOpen(false)}
                        >X
                        </XCircleIcon>

                        <ul className="flex flex-col justify-between items-center gap-3 mt-16">
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
                                    onClick={() => {
                                        setFilteredProductsCategories('')
                                        setIsNavBarOpen(false)
                                    }}
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
                                    onClick={() => {
                                        setFilteredProductsCategories('')
                                        setIsNavBarOpen(false)
                                    }}
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
                                    onClick={() => {
                                        setFilteredProductsCategories('')
                                        setIsNavBarOpen(false)
                                    }}
                                >
                                    Sign In
                                </NavLink>
                            </li>
                            <li
                                className="flex justify-center items-center"
                            >
                                <ShoppingBagIcon
                                    onClick={() => {
                                        setIsNavBarOpen(false)
                                        setIsMyOrderOpen(true)
                                    }}
                                    className="w-6 h-full cursor-pointer"
                                />
                                <span className="select-none">{shoppingCartCount}</span>
                            </li>
                        </ul>
                    </aside>
                </>}
                {/*Screen >= 768px*/}
                {screenWidth >= 768 && <>
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
                            onClick={() => setFilteredProductsCategories('')}
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
                            onClick={() => setFilteredProductsCategories('')}
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
                            onClick={() => setFilteredProductsCategories('')}
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
                </>}
            </ul>
        </nav>
    );
}

export {NavBar};