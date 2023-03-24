import React, { useState, useContext } from 'react'
import cond from './photo/cond.png'
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

      <h1 className={'pb-3 pl-3 font-sans text-xl font-bold ' + bgColor}>Today's Deal</h1>
      <div>
        <Swiper
          effect="fade"
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          grabCursor={true}
          speed={1000}
          onActiveIndexChange={(e) => handleSlideChange(e)}
          className="h-full w-full"
          pagination={{
            // type: "progressbar",
          }}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide >
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="text-4xl p-10 text-white font-bold">Slide 1</h2>
              <img src={cond} alt="" className="p-10" style={{ maxHeight: "40vh", width: "55%" }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="text-4xl p-10 text-white font-bold">Slide 2</h2>
              <img src={cond} alt="" className="p-10" style={{ maxHeight: "40vh", width: "55%" }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={bgColor + " h-full w-full flex items-center justify-between"}>
              <h2 className="text-4xl p-10 text-white font-bold">Slide 3</h2>
              <img src={cond} alt="" className="p-10" style={{ maxHeight:"40vh",width:"55%"}} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <h1 className='p-4 font-sans text-xl font-bold'>Categories</h1>
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
  )
}