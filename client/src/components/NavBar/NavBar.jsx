import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import "./NavBar.css";
import image from '../../img/negro.png';

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/home">
        <span className="landinglink">
          <img src={image} width="130" height=" 80" alt="dog" />
        </span>
      </Link>
      <SearchBar />
      <Link to="/create"><button className="create">CREAR PERRO</button></Link>
    </nav>
  )
}

export { NavBar }
