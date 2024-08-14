import React, {useContext, useRef, useState} from 'react';
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

    const [view, setView] = useState('login');
    const form = useRef(null);

    const createAnAccount = () => {
        const formData = new FormData(form.current);
        setAccount({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        })
        setFilteredProductsCategories('')
        setSignOut(false)
    }

    const renderLogIn = () => {
        return (
            <div className="flex flex-col w-80">
                <p>
                    <span className="font-light text-sm">Email: </span>
                    <span>{account?.email}</span>
                </p>
                <p>
                    <span className="font-light text-sm">Password: </span>
                    <span>{'*'.repeat(account.password.length)}</span>
                </p>
                <Link
                    to="/"
                    onClick={() => {
                        setFilteredProductsCategories('')
                        setSignOut(false)
                    }}
                >
                    <button
                        className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
                        disabled={Object.keys(account).length === 0}
                    >
                        Log in
                    </button>
                </Link>
                <div className="text-center">
                    <a className="font-light text-xs underline underline-offset-4" href="/">Forgot my password</a>
                </div>
                <button
                    className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
                    onClick={() => setView('sign-up')}
                >
                    Sign up
                </button>
            </div>
        )
    }

    const renderCreateUserInfo = () => {

        return (
            <form ref={form} className="flex flex-col gap-4 w-80">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-light text-sm">Your name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={account?.name}
                        placeholder="Peter"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-light text-sm">Your email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={account?.email}
                        placeholder="peter@email.com"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-light text-sm">Your password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue={account?.password}
                        placeholder="*******"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                        required
                    />
                </div>
                <Link to="/">
                    <button
                    className="bg-black text-white w-full rounded-lg py-3"
                    onClick={() => createAnAccount()}
                    >Create
                    </button>
                </Link>
            </form>
        )
    }

    return (
        <Layout>
            <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
            {view === 'login' ? renderLogIn() : renderCreateUserInfo()}
        </Layout>
    );
}

export {Signin};