import React from 'react'
import './GoogleButton.css'
const GoogleButton = ({ onClick }) => {
    return (
        <button
            type="button"
            className="login-with-google-btn w-full"
            onClick={onClick}
        >
            Sign in with Google
        </button>
    )
}

export default GoogleButton
