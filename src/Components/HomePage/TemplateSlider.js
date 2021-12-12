import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper";
import SingleTemplate from "../Templates/SingleTemplate";
import { slidertemplates, VideoTemplates } from "../Templates/TempData";
import history from "../../Utils/History";
import { Tabs, Tab, Button } from "react-bootstrap";
import "./styles.css"
SwiperCore.use([Autoplay, Pagination, Navigation, Scrollbar]);

const redirect = () => {
  window.location.href =
    "https://www.youtube.com/channel/UCF0WL5F607A9hJr_slnM1Yw";
};

const formCollect = () => {
  window.open("https://forms.gle/bWjqDXCha7TtDpew7", "_blank");
};
function TemplateSlider(props) {
  return (
    <>
      <div className="container" style={{ background: "antiquewhite" }}>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="tabstemp-slider"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            backgroundColor: 'white'

          }}
        >
          <Tab eventKey="home" title="Image Templates" className="home_tabs">
            <h2
              style={{
                fontWeight: 600,
                textAlign: "center",
                display: "none",
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
              {slidertemplates.map((template, index) => {
                return (
                  <SwiperSlide key={index}>
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
                className="btn btn-primary my-4"
                style={{ borderRadius: "20px", width: "20vh" }}
                onClick={() => {
                  history.push("/templates");
                }}
              >
                Explore All
              </button>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Video Invite">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
            >
              {VideoTemplates.map((template) => {
                return (
                  <SwiperSlide>
                    <iframe
                      width="560"
                      height="315"
                      src={template.url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay"
                      allowFullScreen
                      onClick={console.log("Clicked")}
                    ></iframe>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        className="template_btn"
                        variant="primary"
                        style={{ marginTop: "auto" }}
                        onClick={formCollect}
                      >
                        Create Your Own
                      </Button>
                    </div>
                    <p style={{ textAlign: "center" }}> (Starts from 299)</p>
                    <br />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div style={{ textAlign: "center" }}>
              {" "}
              <Button
                variant="primary"
                style={{ borderRadius: "20px" }}
                onClick={redirect}
              >
                Explore More
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default TemplateSlider;
