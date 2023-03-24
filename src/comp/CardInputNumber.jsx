import React, { useState, useEffect ,useContext } from 'react'
import CartState from "./ContextProvider"

function CardInputNumber({ item }) {
    const [count, setCount] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const {setCart} = useContext(CartState)

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        let cartItem = cart.filter(w => w.id === item.id)
        if (cartItem[0]) {
            setCount(parseInt(cartItem[0].quantity))
            setShowButtons(true)
        }
    }, [item.id]); //item.id

    const handlePlusClick = () => {
        if (!showButtons) setShowButtons(true);
         const quantity = count + 1;
        if (quantity < 15) setCount(quantity)
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart = cart.filter(w => w.id !== item.id)
        cart = [...cart, { ...item, quantity }]
        localStorage.setItem('cart', JSON.stringify(cart))
        setCart(cart)
    };
    const handleMinusClick = () => {
        if (count === 1) setShowButtons(false);
        let quantity = count - 1;
        if (quantity >= 0) setCount(quantity);

        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart = cart.filter(w => w.id !== item.id)
        if (quantity > 0) cart = [...cart, { ...item, quantity }]
        localStorage.setItem('cart', JSON.stringify(cart))
        setCart(cart)
    };
    return (
        <div className="flex items-center justify-center">
            {showButtons && (
                <button
                    onClick={handleMinusClick}
                    className="bg-green-600 text-white hover:bg-green-700 h-7 w-7 rounded cursor-pointer"
                >
                    <span className=" text-xl font-thin">−</span>
                </button>
            )}
            {showButtons && (
                <input
                    onChange={() => { }}
                    type="number"
                    className="items-center justify-center text-center w-7 h-7 rounded-md font-semibold text-base text-black"
                    value={count}
                    min="0"
                    max="15"
                />
            )}
            <button
                onClick={handlePlusClick}
                className={"bg-green-600 text-gray-100 hover:bg-green-700 h-7 rounded cursor-pointer"}
            >
                <span className="text-xl font-thin">{count > 0 ? <p className='w-7'>+</p> : <p className=' w-12 text-base '>Add</p> }</span>
            </button>
        </div>
    );
}
export default CardInputNumber

