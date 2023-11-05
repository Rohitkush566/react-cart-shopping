import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext({
    products: [],
    cartItems: [],
    addToCartHandler: () => { },
    removeFromcartHandler: () => { },
    decrementCartQuantityHandler: () => { }
});

const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

export const CartContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(initialCartItems);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch('https://dummyjson.com/products');
            const resData = await response.json();
            setProducts(resData.products);
        }
        getProducts();
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    const addToCartHandler = (product, increaseQty = true) => {
        setCartItems((prev) => {
            const existingCartItem = prev.find((cartItem) => cartItem.id === product.id);

            if (existingCartItem) {
                const updatedCart = prev.map((cartItem) => {
                    if (cartItem.id === existingCartItem.id) {
                        return { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
                    } else {
                        return cartItem;
                    }
                })
                return updatedCart;
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
        const existingProduct = products.find((cartItem) => cartItem.id === product.id);

        const updatedProducts = products.map((prod) => {
            if (existingProduct.id === prod.id) {
                return { ...existingProduct, stock: existingProduct.stock - 1 }
            }
            return prod;
        })
        setProducts(updatedProducts);

        if (increaseQty) {
            toast.info(`Increased ${product.title} cart quantity`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success(`${product.title} added to cart successfully`, {
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
    }

    const removeFromcartHandler = (product) => {

        const filteredCartItems = cartItems.filter((cartItem) => product.id !== cartItem.id);
        setCartItems(filteredCartItems);

        const existingProduct = cartItems.find((cartItem) => cartItem.id === product.id);
        const updatedProducts = products.map((prod) => {
            if (existingProduct.id === prod.id) {
                return { ...existingProduct, stock: product.stock }
            }
            return prod;
        })
        setProducts(updatedProducts);
        toast.warn(`${product.title} removed from cart successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    const decrementCartQuantityHandler = (product) => {
        if (product.quantity === 1) {
            removeFromcartHandler(product);
        } else {
            // updation in cartProducts
            const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

            const updatedCart = cartItems.map((cartItem) => {
                if (existingCartItem.id === cartItem.id) {
                    return {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity - 1,
                    };
                } else {
                    return cartItem;
                }
            })
            setCartItems(updatedCart);

            // updation in mainProducts
            const existingProduct = products.find((prod) => prod.id === product.id);

            const updatedProducts = products.map((prod) => {
                if (prod.id === existingProduct.id) {
                    return { ...existingProduct, stock: existingProduct.stock + 1 };
                } else {
                    return prod;
                }
            })
            setProducts(updatedProducts);
            toast.info(`Decreased ${product.title} cart quantity`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <CartContext.Provider
            value={{
                products,
                addToCartHandler,
                cartItems,
                removeFromcartHandler,
                decrementCartQuantityHandler
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;