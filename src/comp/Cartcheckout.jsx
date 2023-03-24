import React from 'react'
function Cartcheckout({totalPrice}) {
    // let cart = JSON.parse(localStorage.getItem('cart') || '[]')

    // for(const i=0;i<localStorage.length;i++){
    //     let result=localStorage.getItem("currentprice")
    //     console.log(result)
    // }
    return (
        <div className=' fixed right-0 pr-16 '>
            <h6 className='text-xs'>ENTER PROMO CODE</h6>
            <div className='flex'>
                <input className="placeholder:serif placeholder:text-slate-400 bg-white w-60 border-2 border-slate-300 rounded-md py-2 pl-3 pr-3 focus:border-red-300 focus:outline-none  sm:text-sm" placeholder="promo code" type="text" />
                <button className='bg-black text-white p-2  text-center rounded-md -ml-2 w-24 font-2xl '> submit</button>
            </div>
            <div className='flex flex-col w-80 pt-6'>
                <div className='flex flex-row justify-between items-center pt-4'>
                    <h6>Shipping cost</h6>
                    <p className=' text-base font-semibold '>TBD</p>
                </div>
                <div className='flex flex-row justify-between items-center pt-4'>
                    <h6>Discount</h6>
                    <p className=' text-base font-semibold '>-$0</p>
                </div>
                <div className='flex flex-row justify-between items-center py-4'>
                    <h6>Tax</h6>
                    <p className=' text-base font-semibold '>TBD</p>
                </div>
                <span className=' border-t border-slate-400 w-full'></span>
                <div className='flex flex-row justify-between items-center py-4'>
                    <h5>Estimated Totall</h5>
                    <p className=' text-base font-semibold '>${totalPrice}</p>
                </div>
                <button className="my-1 group rounded-2xl h-12 w-40 bg-green-500 hover:text-gray-800 font-bold text-lg text-white relative overflow-hidden">
                    Checkout
                    <div className="absolute duration-500 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/20 rounded-2xl">
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Cartcheckout