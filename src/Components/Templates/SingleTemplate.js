import React from 'react';
import TemplateOne from "../../Assets/TemplateOne.jpg";
import "./Templates.scss"

export default function SingleTemplate(props) {
    return(
        <div class="page-content">
        <div
          class="card template_card"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "contain",
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            width:'fit-content'
          }}
        >
          <div class="content">
            <h2 class="title">{props.name}</h2>
            <p class="copy">{props.desc}</p>
            {/* <button class="btn template_btn">Use Template</button> */}
          </div>
        </div>
      </div>
    )
}

SingleTemplate.defaultProps = {
    image: TemplateOne,
    name: "Template",
    desc: "Yatin Weds Charu",
  };