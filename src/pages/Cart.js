import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import CartContext from '../store/cart-context'

const Cart = () => {

  const { cartItems, removeFromcartHandler, addToCartHandler, decrementCartQuantityHandler } = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(() => {
      const updatedAmount = cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity);
      }, 0)
      return updatedAmount;
    })
  }, [cartItems])

  const continueShoppingHandler = () => {
    navigate('/');
  }

  return (
    <div>
      <Navbar />
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className="flex h-full flex-col bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="text-lg font-medium text-gray-900">Shopping cart</div>
              <div className="ml-3 flex h-7 items-center">
              </div>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link>{product.title}</Link>
                            </h3>
                            <p className="ml-4">${product.price * product.quantity}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 text-lg">
                            Qty
                            <button onClick={()=>{addToCartHandler(product)}} className='ml-10 text-2xl'>+</button>
                            <span className=" w-10 rounded-md border-0 outline-none py-1.5 pl-4 text-gray-900">
                              {product.quantity}
                            </span>
                            <button onClick={()=>{decrementCartQuantityHandler(product)}} className='ml-4 text-2xl'>-</button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => { removeFromcartHandler(product) }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={continueShoppingHandler}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
