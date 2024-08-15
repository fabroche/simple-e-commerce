import React, {useContext, useRef, useState} from 'react';
import {Layout} from "../../Components/Layout";
import {ShopContext} from "../../Context/index.jsx";

function MyAccount() {

    const {
        account,
        setAccount,
        isAuthenticate
    } = useContext(ShopContext)

    const [view, setView] = useState('user-info');
    const form = useRef(null);

    const editAccount = () => {
        const formData = new FormData(form.current)
        setAccount({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        })
    }

    const renderUserInfo = () => (
        <div className='flex flex-col w-80'>
            <p>
                <span className='font-light text-sm'>Name: </span>
                <span>{account?.name}</span>
            </p>
            <p>
                <span className='font-light text-sm'>Email: </span>
                <span>{account?.email}</span>
            </p>
            <button
                className='border border-black rounded-lg mt-6 py-3'
                onClick={() => setView('edit-user-info')}>
                Edit
            </button>
        </div>
    )

    const handleEditUserInfo = (e) => {
        editAccount()
        setView('user-info')
        location.href = '/my-account'
    }

    const renderEditUserInfo = () => (
        <form ref={form} className='flex flex-col gap-4 w-80' onSubmit={() => handleEditUserInfo()}>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='font-light text-sm'>Your name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={account.name}
                    placeholder="Peter"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    required
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-light text-sm'>Your email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={account.email}
                    placeholder="hi@helloworld.com"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    required
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-light text-sm'>Your password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    defaultValue={account.password}
                    placeholder="******"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    required
                />
            </div>
            <button
                className='bg-black text-white w-full rounded-lg py-3'
                type={"submit"}
            >
                Edit
            </button>
        </form>
    )

    const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

    return (
        <Layout>
            <h1 className="font-medium text-xl text-center mb-6 w-80">My Account</h1>
            {renderView()}
        </Layout>
    );
}

export {MyAccount};