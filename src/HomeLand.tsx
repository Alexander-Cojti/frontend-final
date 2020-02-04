import { useEffect, Fragment } from "react";
import * as React from 'react';
import * as AOS from "aos";
import * as $ from "jquery";

import "aos/dist/aos.css";
import "./assets/styles/main.scss";

import Home from "./Home/Home";
import Header from "./Home/Header";
import About from "./Home/About";
import Contact from "./Home/Contact";

const HomeLand = () => {
  useEffect(() => {
    AOS.init({ once: true });

    let navElement = $("nav");

    $(function () {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
    $(window).on("scroll", function () {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
  });

  return (
    <Fragment>
      <Header />
      <main>
        <Home />
        <About />
        <Contact />
      </main>
    </Fragment>
  );
};

export default HomeLand;
