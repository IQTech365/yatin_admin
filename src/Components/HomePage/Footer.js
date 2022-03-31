import React from "react";
import "./styles.css";
import history from "./../../Utils/History"
import {
  FaTwitter,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";


export default function Footer() {
  return (
    <footer
      className="footer_wrap p-4 mt-3"
      style={{ background: "#1F1F1F", marginTop: 50 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-5 text-md-left text-center mb-2 mb-md-0">
            <p className="text-white mb-0">
              Copyright @ 2021, All Rights Reserved by Cy Ecommerce LLP
            </p>
          </div>
          <div className="col-md-2 text-center">
            {" "}
            <a href="#" className="text-white">
              Terms &amp; Conditions
            </a>{" "}
          </div>
          <div className="col-md-3 text-center">
            {" "}
            <a href="#" className="text-white">
              Privacy &amp; Policy
            </a>{" "}
          </div>

          <div className="col-md-2 text-right">
            <div className="justify-content-center justify-content-md-end d-flex flex-row">
              <a
                href="https://www.facebook.com/Minvitd/"
                className="ml-3 text-white"
              >
                <FaFacebookF size="20" />
              </a>
              {/*            <a href="#" className="ml-3 text-white">
                <FaTwitter size='20' />
              </a>
              <a href="#" className="ml-3 text-white">
                <FaWhatsapp size='20' />
              </a>
              <a href="#" className="ml-3 text-white">
                <FaInstagram size='20' />
              </a> */}
            </div>
          </div>
          <div className="col-md-3 text-center">
            <a href="#" className="text-white">
              Version:2.4.6
            </a>
          </div>
        </div>
      </div>
      <a class="magic" href="https://yatin-admin.vercel.app">

        Yatin,Rahul

      </a>
    </footer >
  );
}
