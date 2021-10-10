import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper";

import Banner from "../../Assets/Banner.jpg";
import BannerTwo from "../../Assets/BannerTwo.jpg";
import BannerThree from "../../Assets/BannerThree.jpg";



SwiperCore.use([Autoplay, Pagination, Navigation, Scrollbar]);
const GiftBanner = () => {
  return (
    <>

    <Swiper
      centeredSlides={true}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 6500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        "dynamicBullets": true
      }}
    >
      <SwiperSlide>
        <img src={Banner} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={BannerTwo} />
      </SwiperSlide>
     {/*  <SwiperSlide>
        <img src={BannerThree} />
      </SwiperSlide> */}
    </Swiper>
    </>
  );
};
export default GiftBanner;
