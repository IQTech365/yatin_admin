import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper";
import SingleTemplate from "../Templates/SingleTemplate";
import { slidertemplates } from "../Templates/TempData";
import history from "../../Utils/History";

SwiperCore.use([Autoplay, Pagination, Navigation, Scrollbar]);

function TemplateSlider(props) {
  return (
    <>
      <div className="container">
        <h2
          style={{
            fontWeight: 600,
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Templates
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {slidertemplates.map((template) => {
            return (
              <SwiperSlide>
                <SingleTemplate
                  name={template.title.slice(0, 10)}
                  image={template.urlToImage}
                  desc={template.shortdesc}
                />{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div style={{ display: "flex", justifyContent: "center" }}>
        
            <button
              type="button"
              class="btn btn-primary my-4"
              style={{ borderRadius: "20px", width: "20vh" }}
              onClick={() => {
                  history.push("/templates")
              }}
            >
              Explore All
            </button>
          
        </div>
      </div>
    </>
  );
}

export default TemplateSlider;
