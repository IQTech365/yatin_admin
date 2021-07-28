import React from 'react';
import "./MobileHeader.css"
import { Navbar, Container, Row, Col, Avatar, Image } from 'react-bootstrap'
import MobileLogo from "../../../Assets/MobileLogo.png"

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

            </Row>


          </Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
}

export default MobileHeader;