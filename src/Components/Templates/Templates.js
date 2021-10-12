import React from "react";
import { templates } from "./TempData";
import SingleTemplate from "./SingleTemplate";
import "./Templates.scss";
import Navbar from "../HomePage/Navbar"



export default function Templates(props) {

  return (
    <div className="container" style={{background:'antiquewhite'}}>
      <Navbar />
      <h2 style={{fontSize:'20px', fontWeight:600, textAlign:'center', marginTop:'15px'}}>Choose From a Variety of Templates</h2>
      <div className="row">
      {templates.map((template) => {
       
        return(
          <div className="col-6 col-md-auto mobile-row">
          <SingleTemplate
          name={template.title.slice(0, 10)}
          image={template.urlToImage}
          desc={template.shortdesc}
        />

        </div>
       
        )
        
      })}
      
      </div>
    </div>
  );
}
