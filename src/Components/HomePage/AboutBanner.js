import React from "react";
import "./styles.css";
import DanceIcon from "../../Assets/DanceIcon.png"
import Swiper from "react-id-swiper";
import HappyIcon from "../../Assets/Group 4317.png"
import celebrateslide from "../../Assets/celebrateslide.jpg"
import birthdayslide from "../../Assets/birthdayslide.jpg"


export default function AboutBanner() {
  return (
    <Swiper>
      <div className="personal_area py-75" style={{ marginTop: 20 }}>
        <div className="container">
          <div className="owl-carousel owl-theme owlPresonalArea">
            <div className="item">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={celebrateslide}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h2 className=" font-weight-bold">Personal Events</h2>
                  <p className="text-secondary">
                  Invite your guests now digitally on a DIY Platform with no
                      hassle and also share your excitement by bringing them on
                      the same platform, with lot more features to keep them all
                      engaged. You can also share your memories/album with all
                      the guests at a go and keep them all updated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="personal_area py-75">
        <div className="container">
          <div className="owl-carousel owl-theme owlPresonalArea">
            <div className="item">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={birthdayslide}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h2 className="font-weight-bold">Video Conferencing</h2>
                  <p className="text-secondary">
                  Excited about your child birthday? Now share your excitement with all your guests digitally. A smart tracker for RSVP and managing your guests. Also, keep your memories with you forever with digital albums. 
<br /><br />
<span style={{textAlign:"center"}}>Create Invite Now!😊</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Swiper>
  )
}


