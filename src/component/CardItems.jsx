import React, { useState, useEffect,useContext } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import CardInputNumber from './CardInputNumber';
import ThemeContext from './ContextProvider'

function CartItem({
    id,
    image,
    title, 
    description, 
    currentprice, 
    previousprice,
    itemname 
}) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
       // console.log(wishlist)
        const liked = wishlist.findIndex(w => w.id === id) !== -1

        if (liked) {
            setIsLiked(true)
        }
    },[id]) //id

    const handleLiked = () => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        if (isLiked) {
            wishlist = wishlist.filter(w => w.id !== id)
        } else {
            wishlist = [...wishlist, { id, image, title, description, currentprice, previousprice,itemname }]
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        setIsLiked(!isLiked)
    }
    const { IsDarkMode } = useContext(ThemeContext);
    return (
        <>
        {/* <div className=' flex justify-center items-center w-full h-full '> */}
            <div className="inline-flex justify-center flex-wrap">
                {/* bg-cardOverlay */}
                <div className={`${IsDarkMode ?"bg-gray-700":"bg-gray-300"} m-4  backdrop-blur-md h-52 w-40 rounded-lg `}>
                    <div className='  flex justify-between '>
                        <span className='bg-green-400 h-6 w-14 text-center pt-1 font-bold text-xs rounded-tl-lg rounded-br-lg '>55% off</span>
                        <button className='pr-2 pt-2'
                            onClick={() => handleLiked()}
                        >
                            {isLiked ? <IoIosHeart size={24} color="red" /> : <IoIosHeartEmpty size={24} />}
                        </button>
                    </div>
                    <img src={image} alt="" className=' mt-2 h-24 w-24 mx-auto object-fill ' />
                    <div className='mt-2 flex justify-center items-center'>
                        <h1 className='text-base font-bold pr-1 '>{itemname}</h1>
                        <p className=' text-xs  text-gray-600 '>{description}</p>
                    </div>
                    <div className='pt-2 flex  items-center justify-around'>
                        <div className=' flex items-center'>
                            <h3 className='  text-lg font-bold'>${currentprice}</h3>
                            <h3 className="  text-gray-500 line-through pl-1 text-xs inline">${previousprice}</h3>
                        </div>
                        <CardInputNumber item={{ id, image, title, description, currentprice,itemname}} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartItem