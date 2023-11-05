import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProtectedLoginRoute from './pages/ProtectedRoute'

const App = () => {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={
          <ProtectedLoginRoute>
            <Login />
          </ProtectedLoginRoute>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </div>
  )
}

export default App
