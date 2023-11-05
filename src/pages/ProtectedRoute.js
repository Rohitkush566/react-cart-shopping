import React, { useContext } from 'react'
import authContext from '../store/auth-context'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(authContext);

    if (currentUser) {
        return <Navigate to='/' />
    } else {
        return children;
    }

}

export default ProtectedRoute
