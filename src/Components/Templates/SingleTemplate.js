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
            backgroundSize: "cover",
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',

          }}
        >
          <div class="content">
            <h2 class="title" style={{visibility:'hidden'}}>{props.name}</h2>
            <p class="copy" style={{visibility:'hidden'}}>{props.desc}</p>
          
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