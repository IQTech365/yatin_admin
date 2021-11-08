import React, { useState, useEffect } from "react";
import "./styles.css";
import MainBanner from "./MainBanner";
import Contact from "./ContactUs";
import Footer from "./Footer";
import Features from "./Features";
import Additionals from "./Additionals";
import AboutBanner from "./AboutBanner";
import ChatWidget from "./ChatWidget";
import CircularProgress from "@material-ui/core/CircularProgress";
import TemplateSlider from "./TemplateSlider";
import Testimonials from "./Testimonials";

export default function HomePage() {
  const [Loading, setLoading] = useState(false);
  useEffect(async () => {
    await setLoading(true)
    const timer = setTimeout(async () => {
      await setLoading(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <div>
      {Loading === true ? <CircularProgress style={{ width: '6vw', position: 'fixed', top: '45vh', left: '47vw' }} /> :
        <>
          <MainBanner />
          <ChatWidget />
          <TemplateSlider />
       
          <Features />
          <AboutBanner />
          <Additionals />
          {/* <Testimonials /> */}
       {/*  <CompanySlide />  */}
          <Contact />
          <Footer />

        </>}
    </div>
  )
}

