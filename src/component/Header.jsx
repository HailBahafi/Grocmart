import { useContext } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsBagHeart, BsMoonStars, BsCloudSunFill } from "react-icons/bs";
import logo from './photo/logo.png'
import { Link } from 'react-router-dom'
import cartState from './ContextProvider'

function Header({ IsDarkMode, handledarkmode, bgColor }) {

    const { cart } = useContext(cartState)
    return (
        <div className={`${bgColor}`}>
            <div className='flex items-center justify-between flex-row content-center text-white py-6 bg-gray-900 bg-opacity-10 '>
                <Link to="/" className='ml-32'>
                    <img className="h-24 w-20" src={logo} alt="logo" />
                </Link >
                <div className=' flex  items-ceter  content-center'>
                    <button className={` mt-2 w-11 h-11 p-2 items-center rounded-full ${IsDarkMode ? " hover:bg-slate-600" : "hover:bg-slate-200"} `} onClick={handledarkmode}>
                        {IsDarkMode ? <BsMoonStars size={25} color='white' /> : <BsCloudSunFill size={25} color='black' />}
                    </button>
                    <Link to='/Mywishlist'>
                        <button className={`h-16 w-16 pl-4 ${IsDarkMode ? ' text-white' : ' text-black'}`} >
                            <BsBagHeart size={35} />
                        </button>
                    </Link>
                    <Link to='/Cart' className='mr-20'>
                        <button className={`h-16 w-16 ${IsDarkMode ? "text-white" : "text-black"} `}>
                            <AiOutlineShoppingCart size={35} />
                        </button>
                        <h4 className={`${IsDarkMode ? "bg-white text-black" : "bg-black text-white"} absolute right-28  top-10 h-5  w-4 text-center rounded-lg text-xs`}>{cart.length}</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header