import React from "react";
import "./styles.css";
import MainBanner from "./MainBanner";
import Contact from "./ContactUs";
import Footer from "./Footer";
import Features from "./Features";
import Additionals from "./Additionals";
import AboutBanner from "./AboutBanner";
import ChatWidget from "./ChatWidget";
class HomePage extends React.Component {
  render() {
    return (
      <>


        <MainBanner />
        <ChatWidget />
        <Features />
        <AboutBanner />
        <Additionals />
        {/* <Testimonials />
        <CompanySlide /> */}
        <Contact />
        <Footer />

      </>
    );
  }
}

export default HomePage;
