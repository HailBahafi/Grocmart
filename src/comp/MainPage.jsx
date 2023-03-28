import React, { useState, useContext } from 'react'
import img7 from './photo/7.png'
import slider2 from './photo/slider2.png'
import Slide3 from './photo/Slide3.png'
import HeadlineAnimation from './HeadlineAnimation'
import Items_Categories from './Categories/Items_Categories'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import SwiperCore, { EffectFade, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardItem from './CardItems';
import ThemeContext from './ContextProvider'
import Categories from './Categories/Categories.js'
import Header from "./Header"
SwiperCore.use([EffectFade, Autoplay]);

export default function MainPage() {
  const [Itemcategory, SetItemcategory] = useState([...Items_Categories])
  const [Category] = useState(Categories)
  const [activecateg, setactivecateg] = useState(Category.id);
  const Filtercategory = (val) => {
    if (val === 'All') {
      SetItemcategory([...Items_Categories])
      return
    }
    const result = Items_Categories.filter((currdata) => {
      return currdata.title === val
    })
    SetItemcategory(result)
  }
  const handleCategoryClick = (val) => {
    setactivecateg(val.id);
  }
  const { IsDarkMode, SetIsDarkMode } = useContext(ThemeContext);
  const handledarkmode = () => {
    SetIsDarkMode(!IsDarkMode)
    localStorage.setItem('darkMode', !IsDarkMode)
  }
  let bgColors = ["bg-[#539165]", "bg-[#3F497F]", "bg-[#F7C04A]"]
  const [bgColor, setBgColor] = useState("bg-[#539165]")
  let handleSlideChange = (i) => {
    setBgColor(bgColors[i.realIndex])
  }
  return (
    <div className={IsDarkMode ? "dark_mode" : ""}>
      <Header bgColor={bgColor} IsDarkMode={IsDarkMode} handledarkmode={handledarkmode} />
      <div>
      <HeadlineAnimation Hname={'Today`s Deal'} bgColor={bgColor} />
        <Swiper
          effect="fade"
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          grabCursor={true}
          speed={1000}
          onActiveIndexChange={(e) => handleSlideChange(e)}
          className="h-full w-full"
          pagination={{
            //  type: "progressbar",
          }}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide >
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="  text-3xl pl-32 text-white font-bold">𝙴𝙰𝚃 <br/> 𝙵𝙴𝙰𝚂𝚃 <br/> 𝚁𝙴𝙿𝙴𝙰𝚃 <br/> 𝔲𝔭𝔱𝔬 40%𝔬𝔣𝔣</h2>
              <div className='h-2/12 w-5/12 pr-14' ><img src={img7} alt="" className="   " /></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="text-4xl p-10 text-white font-bold"> 𝑩𝒆𝒂𝒕 𝒕𝒉𝒆 𝒉𝒆𝒂𝒕 𝒘𝒊𝒕𝒉 <br/> 𝒐𝒖𝒓 𝒊𝒄𝒚 𝒅𝒆𝒍𝒊𝒈𝒉𝒕𝒔 <br/> 𝑮𝒆𝒕 𝒖𝒑 𝒕𝒐 <br/> 15% 𝑶𝑭𝑭! <br/></h2>
              <div className='h-2/12 w-5/12 pr-14' ><img src={Slide3} alt="" className="   " /></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="text-4xl pl-20 text-white font-bold">𝒢𝑜𝑜𝒹 𝐹𝑜𝑜𝒹,<br/> 𝐵𝑒𝓉𝓉𝑒𝓇 𝑀𝑜𝑜𝒹 <br/>𝒰𝓅𝓉𝑜 20% 𝒪𝐹𝐹</h2>
              <div className='h-2/12 w-5/12 pr-14' ><img src={slider2} alt="" className="   " /></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <HeadlineAnimation Hname={'Categories'} />
        <div className='flex justify-center text-center flex-wrap py-10'>
        {
          Category.map((val) => {
            return (
              <div 
                key={val.id}
                className={`py-4 px-6 cursor-pointer   
                ${activecateg === val.id
                    ?'border-b-2 border-green-500 text-green-500'
                    :' hover:text-green-500'
                  }`}
                onClick={() =>{handleCategoryClick(val) ; Filtercategory(val.title);}}
              >
                <h2 className='font-sans font-bold text-sm'>{val.title}</h2>
              </div>
            )
          })
        }
      </div>
      
      <div className=' flex items-center justify-center flex-wrap'>
        {
        Itemcategory.map((val) => {
          return (
            <CardItem key={val.id}
              id={val.id}
              image={val.image}
              itemname={val.itemname}
              title={val.title}
              description={val.description}
              currentprice={val.currentprice}
              previousprice={val.previousprice}
            />
          )
        })
      }
      </div>
    </div>
  )
}