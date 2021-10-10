import React from "react";
import { templates } from "./TempData";
import SingleTemplate from "./SingleTemplate";



export default function Templates(props) {
  return (
    <div className="container">
      <h1>Choose From a Varierty of Templates</h1>
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
