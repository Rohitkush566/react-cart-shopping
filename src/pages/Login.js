import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import authContext from "../store/auth-context";
import GoogleButton from "../components/UI/GoogleButton";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";

export default function Login() {
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false);
    const { getUser, fetchData } = useContext(authContext);
    const navigate = useNavigate();

    const handleInputs = (event) => {
        setEnteredValues({
            ...enteredValues,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const { email, password } = enteredValues;
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            setError(false);
            getUser(user);

            let list = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            fetchData(list);
            navigate('/');

        } catch (error) {
            setError(error.message)
        }
    }

    const googleSignInHandler = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, provider);
            getUser(user);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                                    value={enteredValues.email}
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                                    value={enteredValues.password}
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>
                        {error && <div className="text-red-500 ml-auto">Invalid Email or Password!</div>}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                            <div className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold">
                                or
                            </div>
                            <div className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold">
                                <GoogleButton onClick={googleSignInHandler} />
                            </div>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
