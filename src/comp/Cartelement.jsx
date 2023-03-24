import React, { useState,useContext} from 'react'
import { InputNumber } from 'rsuite';
import cartState from './ContextProvider'

function Cartelement({ id, image, title, description, currentprice, quantity, updatetotallprice, itemname }) {
    const [itemprice, SetItemPrice] = useState(quantity * currentprice);
    const {setCart}= useContext(cartState);
     
      const handleClick = (val) => {
        let quantity = val
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart = cart.filter(w => w.id !== id)
        if (quantity > 0)
            cart = [...cart, { id, image, title, description, currentprice, quantity,itemname }]
        localStorage.setItem('cart', JSON.stringify(cart))
        updatetotallprice()
        SetItemPrice(quantity * currentprice)
    };
    const deleteitem = () => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const newCart = cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    };
    const HandleMoveToWhishlist = () => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || '[]')
        const itemIndex = cart.findIndex(item => item.id === id)

        if (itemIndex !== -1) {
            const item = cart[itemIndex]
            cart.splice(itemIndex, 1)
            const found = wishlist.some(val => val.id === item.id)
            item.quantity = item.quantity ? item.quantity : 0;
            if (!found) {
                wishlist.push(item)
                localStorage.setItem('wishlist', JSON.stringify(wishlist))
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            setCart(cart)
        }
    }
    return (
        <div className='flex justify-between border-t border-slate-400 w-11/12 p-2'>
            <div className='flex pt-3'>
                <img src={image} alt="" className='h-36 w-32' />
                <div className='flex flex-col p-4'>
                    <p className='font-semibold text-base'>{itemname}</p>
                    {/* <p className='font-semibold text-base'>{title}</p> */}
                    <p className='text-base font-bold'>{description}</p>
                    <p>Instock</p>
                    <div className='mt-6'>
                        <button className=' px-2 py-2  text-base border-neutral-400  text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-green-400 duration-[400ms,700ms] transition-[color,box-shadow]' onClick={HandleMoveToWhishlist}><p>Move to Wishlist</p></button>
                        <button className=' px-2 py-2  text-base border-neutral-400  text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-red-400 duration-[400ms,700ms] transition-[color,box-shadow]' onClick={deleteitem}><p>remove</p></button>
                    </div>
                </div>
            </div>
            <div>
                <h6>${currentprice} /pic</h6>
            </div>
            <div>
                <h6><div className='text-center font-mono text-xl' style={{ width: 70 }}><InputNumber defaultValue={quantity} max={10} min={1} onChange={(val) => handleClick(val)} /></div></h6>
            </div>
            <div>
                <h6 className='W-10 h-10'>${itemprice}</h6>
            </div>
        </div>
    )
}
export default Cartelement