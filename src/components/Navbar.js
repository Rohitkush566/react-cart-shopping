import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import authContext from '../store/auth-context'

const Navbar = () => {

    const { currentUser, logoutHandler, currentUserData } = useContext(authContext);

    return (
        <header className="text-gray-600 body-font shadow-xl">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    {currentUserData ? (
                        <span>
                            <img src={currentUserData?.user?.img} className="w-10 h-10 text-white bg-indigo-500 rounded-full" alt='hello' />
                        </span>
                    ) : currentUser ? (
                        <span>
                            <img src={currentUser?.photoURL} className="w-10 h-10 text-white bg-indigo-500 rounded-full" alt='hello' />
                        </span>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    )}
                    <span className="ml-3 text-xl">
                        {currentUserData
                            ? 'Hello ' + currentUserData?.user?.name
                            : currentUser ? 'Hello ' + currentUser?.displayName : 'UpendraCart'}
                    </span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <NavLink to='/' className='mr-5'>Home</NavLink>
                    {currentUser
                        ? (
                            <>
                                <NavLink to='/cart' className="mr-5">Cart</NavLink>
                                <button onClick={logoutHandler} className="mr-5">Logout</button>
                            </>
                        )
                        : <NavLink to='/login' className="mr-5">Login</NavLink>
                    }
                </nav>

            </div>
        </header>

    )
}

export default Navbar
