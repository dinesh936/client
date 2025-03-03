import './App.css';
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import bank from './bank.png'; // Importing the logo
import { HashRouter, Routes, Route } from 'react-router-dom';
import Deposit from './deposit';
import Cashback from './cashback';
import Register from './register';
import Alldata from './alldata';
import Carousel from 'react-bootstrap/Carousel';
import bank1 from './bank1.avif';
import bank2 from './bank2.jpg';
import bank3 from './bank3.avif';
import {useState} from 'react';

function App() {
let [isModel, setIsModel]=useState(true);

  return (
    <HashRouter>
     
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={bank} // Use the imported image here
              alt="Logo"
              className="d-inline-block align-top"
              style={{ width: "30px", height: "30px" }}  // Optional: adjust size
            />
            {" "}VaultNet
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" onClick={()=>setIsModel(true)} >Home </Nav.Link>
              <Nav.Link href="#register" onClick={()=>setIsModel(false)}>Register </Nav.Link>
              <Nav.Link href="#deposit" onClick={()=>setIsModel(false)}>Deposit</Nav.Link>
              <Nav.Link href="#cashback" onClick={()=>setIsModel(false)}>Cashback</Nav.Link>
              <Nav.Link href="#alldata" onClick={()=>setIsModel(false)}>All data</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


{ isModel && <Carousel className="custom-carousel" data-bs-theme="dark">
  <Carousel.Item className="custom-carousel-item">
    <img
      className="d-block w-100 custom-image"
      src={bank1}
      alt="First slide"
    />
    <Carousel.Caption className="custom-caption">
      
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item className="custom-carousel-item">
    <img
      className="d-block w-100 custom-image"
      src={bank2}
      alt="Second slide"
    />
    <Carousel.Caption className="custom-caption">
     
     
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item className="custom-carousel-item">
    <img
      className="d-block w-100 custom-image"
      src={bank3}
      alt="Third slide"
    />
    <Carousel.Caption className="custom-caption">
     
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/cashback" element={<Cashback />} />
        <Route path="/alldata" element={<Alldata />} />
      </Routes>
      

    </ HashRouter>
  );
}

export default App;
