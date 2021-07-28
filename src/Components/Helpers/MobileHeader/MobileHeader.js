import React from 'react';
import "./MobileHeader.css"
import {Navbar, Container, Row, Col, Avatar, Image} from 'react-bootstrap'
import MobileLogo from "../../../Assets/MobileLogo.png"
import Soubhagya from "../../../Assets/Soubhagya.jpg"

class MobileHeader extends React.Component {
    render() {
        return (
            <Navbar bg="light" className="mobileheader_nav">
  <Container>
    <Navbar.Brand href="#home">
      <Row>
        <Col> <img
        src={MobileLogo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></Col>
      {/*   <Col>
        <p>Hi, Soubhagya<Image src={Soubhagya} roundedCircle  width="40"
        height="40"/></p>
        </Col> */}
      </Row>
     
      
    </Navbar.Brand>
  </Container>
  </Navbar>
        )
    }
}

export default MobileHeader;