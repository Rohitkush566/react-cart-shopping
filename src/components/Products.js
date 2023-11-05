import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../store/cart-context'

const Products = () => {
    const { products } = useContext(CartContext);

    return (
        <>
            {products.map((product) => {
                return (
                    <Link to={`/product/${product.id}`} className="group relative" key={product.id} >
                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"

                        >
                            <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <div>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                    </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                    </Link>
                )
            })}

        </>
    )
}

export default Products
