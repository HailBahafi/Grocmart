import React, { useState, useEffect, useContext } from 'react'
import Cartelement from './Cartelement'
import Cartcheckout from './Cartcheckout'
import Header from './Header'
import ThemeContext from './ContextProvider'
import {BiShoppingBag} from "react-icons/bi"
function Cart() {
    const {cart} = useContext(ThemeContext);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        updatetotallprice()
    }, [cart])

    const updatetotallprice = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || '[]');
        let result = 0;
        for (const item of cart) {
            const quantity = item.quantity ? parseInt(item.quantity) : 1; // Ensure quantity is a number
            const price = parseFloat(item.currentprice); // Convert the currentprice to a number
            if (!isNaN(quantity) && !isNaN(price)) { // Check if both quantity and price are numbers
                result += quantity * price;
            }
        }
        setTotalPrice(result);
    }
    
    const { IsDarkMode, SetIsDarkMode } = useContext(ThemeContext);
    const handledarkmode = () => {
        SetIsDarkMode(!IsDarkMode)
        localStorage.setItem('darkMode', IsDarkMode)
    }
    return (
        <>
            <div className={IsDarkMode ? "dark_mode" : ""}>
                <Header IsDarkMode={IsDarkMode} handledarkmode={handledarkmode}/>
                <div className='flex items-center justify-center  pb-8  overflow-hidden pt-4'>
                    <span alt="" className={`${IsDarkMode ? "text-white" : " text-black"} `}>< BiShoppingBag size={38} /></span> 
                    <h1 className=' pl-3 font-sans text-3xl font-bold text-black'> My Cart</h1>
                </div>
                <div className=' flex flex-row'>
                    <div className='flex items-center justify-between flex-col w-4/6 font-sans ml-10  '>
                        {
                            cart.map((val) => {
                                return (
                                    <Cartelement
                                        key={val.id}
                                        id={val.id}
                                        image={val.image}
                                        title={val.title}
                                        itemname={val.itemname}
                                        description={val.description}
                                        currentprice={val.currentprice}
                                        quantity={val.quantity ?val.quantity:1 }
                                        updatetotallprice={updatetotallprice}
                                    />
                                )
                            })
                        }
                        <span className='border-b border-slate-400 w-11/12' ></span>
                        <div className='flex justify-between items-center pt-4 pb-8 px-2 w-11/12'>
                            <h6>totall:</h6>
                            <p className='text-lg font-semibold '>${totalPrice}</p>
                        </div>
                    </div>
                    <div>
                        <Cartcheckout totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart