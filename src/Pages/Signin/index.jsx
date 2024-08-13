import React, {useContext} from 'react';
import {Layout} from "../../Components/Layout";
import {ShopContext} from "../../Context/index.jsx";
import {Link} from "react-router-dom";

function Signin() {

    const {
        // Auth
        signOut,
        setSignOut,
        account,
        setAccount,
        // Products
        setFilteredProductsCategories
    } = useContext(ShopContext)

    return (
        <Layout>
            <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
            <div className="flex flex-col w-80">
                <p>
                    <span className="font-light text-sm">Email: </span>
                    <span>{account?.email}</span>
                </p>
                <p>
                    <span className="font-light text-sm">Password: </span>
                    <span>{account?.password?.repeat(account.password.length)}</span>
                </p>
                <Link
                to="/"
                onClick={() => setFilteredProductsCategories('')}
                >
                    <button
                    className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
                    disabled={!signOut}
                    >
                        Log in
                    </button>
                </Link>
                <div className="text-center">
                    <a className="font-light text-xs underline underline-offset-4" href="/">Forgot my password</a>
                </div>
                <button
                className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
                >
                Sign up
                </button>
            </div>
        </Layout>
    );
}

export {Signin};