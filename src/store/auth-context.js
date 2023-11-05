import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authContext = createContext({
    currentUser: null,
    currentUserData: null
});

const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialUserData = JSON.parse(localStorage.getItem('userData')) || null;

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(initialUser);
    const [currentUserData, setCurrentUserData] = useState(initialUserData);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem("userData", JSON.stringify(currentUserData));
    }, [currentUser, currentUserData])

    const getUser = (currUser) => {
        setCurrentUser(currUser);
        toast.success('Login Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const fetchData = (userData) => {
        const localUserData = JSON.parse(localStorage.getItem("user"));
        const filteredUserData = userData.filter((currUserData) => currUserData.user.email === localUserData.email);
        setCurrentUserData(filteredUserData[0]);
    }

    const logoutHandler = () => {
        setCurrentUser(null);
        setCurrentUserData(null);

        localStorage.removeItem("user");
        localStorage.removeItem("userData");

        toast.info('Logout Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        navigate('/');
    }
    return (
        <authContext.Provider value={{
            currentUser,
            getUser,
            logoutHandler,
            fetchData,
            currentUserData

        }}>
            {children}
        </authContext.Provider>
    )
}

export default authContext;