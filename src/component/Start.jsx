import React from 'react';
import logo from './photo/logo.png'
import img2 from './photo/2.jpg'
import img4 from './photo/4.jpg'
import img5 from './photo/5.jpg'
import img6 from './photo/6.png'
import img7 from './photo/7.png'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import "../index.css";
function FirstPage() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className=" bg-green-200 pl-56 pt-4 ">
        <img className=" h-32  w-28 " src={logo} alt="logo" />
        {/* <p class=" font-serif text-2xl pt-4 pb-4">Grocery Mart</p> */}
      </div>
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-2/12 w-5/12 bg-right bg-contain bg-no-repeat "
            style={{ backgroundImage: `url(${img6})` }}>
            <h1 className='pt-40 pl-72 text-left text-4xl font-bold text-gray-900'>Fast Grocery Delivery</h1>
            <p className='pt-7 pl-32 text-left text-2xl font-light text-gray-800'>Enjoy the convenience of fast grocery delivery right to your doorstep<br />
              We understand the importance of time, and that's why we aim to deliver<br />
              your groceries as quickly as possible. You can count on us to provide<br />
              fast and reliable delivery services.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-2/12 w-5/12 bg-right bg-contain bg-no-repeat "
            style={{ backgroundImage: `url(${img2})` }}
          >
            <h1 className='pt-40 pl-72 text-left  text-4xl font-bold text-gray-900'>All Your Grocery Needs</h1>
            <p className='pt-7 pl-32 text-left text-2xl font-light text-gray-800'>We are here to meet all your grocery needs, no matter what you're<br />
              looking for Whether you need everyday essentials,we are here to <br />
              help,With a wide variety of products, you are sure to find everything<br />
              you need in one place.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-2/12 w-5/12 bg-right bg-contain bg-no-repeat mt-14  "
            style={{ backgroundImage: `url(${img7})` }}
          >
            <h1 className='pt-24 pl-72 text-left text-4xl font-bold text-gray-900'>Fresh and Healthy Produce</h1>
            <p className='pt-7 pl-28 text-left  text-2xl font-light text-gray-800'>Our natural vegetable and fruit selection offers the freshest and healthiest <br />
              produce available. We believe in providing our customers with the best<br />
              quality ingredients to support a healthy lifestyle.we have everything you need<br />
              for your everyday essentials or something new to try.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-10/12 bg-right bg-contain bg-no-repeat "
            style={{ backgroundImage: `url(${img4})` }}
          >
            <h1 className='pt-40 pl-72 text-left  text-4xl font-bold text-gray-900'>Safe and Intimate Wellness</h1>
            <p className='pt-7 pl-28 text-left text-2xl font-light text-gray-800'>Maintaining a safe and intimate life are important so we offer a range of <br />
              condoms and sexual wellness products to help you stay protected and <br /> confident
              s Our products are of the highest quality, ensuring that you<br />
              have peace of mind with every use.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-5/6 w-11/12 bg-right bg-contain bg-no-repeat ml-20 "
            style={{ backgroundImage: `url(${img5})` }}
          >
            <h1 className='pt-40 pl-44 text-left  text-4xl font-bold text-gray-900'>Spice up Your Cooking</h1>
            <p className='pt-7 pl-8 text-left text-2xl font-light text-gray-800'>Our selection of spices provides the perfect way to add flavor <br />
              to your cooking. Whether you are a seasoned cook or just <br /> starting out, our spices will elevate your dishes to the next level<br /> With a wide variety of options.</p>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className='flex items-center justify-center py-3 bg-white'>
        <Link to="/">
        <button className="my-1 group rounded-2xl h-12 w-40 bg-green-500 hover:text-gray-800 font-bold text-lg text-white relative overflow-hidden">
                    Start Ordering
                    <div className="absolute duration-500 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/20 rounded-2xl">
                    </div>
                </button>
        </Link>
      </div>
    </>
  )

}
export default FirstPage;