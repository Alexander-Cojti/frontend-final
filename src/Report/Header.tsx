// import * as React from "react";
// import { Link, animateScroll as scroll } from "react-scroll";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Container from "react-bootstrap/Container";
// // import AuthContext from '../services/Auth';
// // import AdalConfig from '../config/AdalConfig';
// // import jwt_decode from 'jwt-decode';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './App.css';



// const Header = () => {
//   const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     let hola = {
//       duration: 1500,
//       delay: 100,
//       smooth: "easeInOutQuint",
//       containerId: id
//     }

//     e.preventDefault();
//     (hola: any)=>{
//     scroll.scrollTo(hola);
//     }

//   };

// // function Saludo() {
// //   return ( AuthContext.login())  
// // }

//   return (
//     <header>
//       <Navbar bg="none" expand="lg" fixed="top">
//         <Container>
//           <Navbar.Brand
//             href="#home"
//             onClick={scrollTo("home")}
//             aria-label="Logo"
//           >
//             DocumentQuery
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav">
//             <span />
//             <span />
//             <span />
//           </Navbar.Toggle>
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav>
//               <Link
//                 href="#"
//                 className="nav-link"
//                 activeClass="active"
//                 to="home"
//                 spy={true}
//                 smooth={true}
//                 offset={0}
//                 duration={400}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="#"
//                 className="nav-link"
//                 activeClass="active"
//                 to="about"
//                 spy={true}
//                 smooth={true}
//                 offset={0}
//                 duration={400}
//               >
//                 About
//               </Link>
//               <Link
//                 href="#"
//                 className="nav-link"
//                 activeClass="active"
//                 to="contact"
//                 spy={true}
//                 smooth={true}
//                 offset={0}
//                 duration={400}
//               >
//                 Contact
//               </Link>
//               {/* <Link >
//                <button type="button" className="btn btn-primary" onClick={()=>Saludo() }> LogIn</button>
//               </Link> */}
//           </Nav>
         
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
