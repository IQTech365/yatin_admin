import React from "react";
import MobileLogo from "../../Assets/MobileLogo.png";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-light">
        <a className="navbar-brand" href="#">
          <img
            src={MobileLogo} 
            width={30}
            height={30}
            className="d-inline-block align-top mx-2"
            alt
          />
         
        </a>
        <Link to="/">
        <Button variant="primary" style={{borderRadius:'20px', fontSize:'12px'}}>Back to Home</Button>
     </Link>
      </nav>
    </div>
  );
}

export default Navbar;