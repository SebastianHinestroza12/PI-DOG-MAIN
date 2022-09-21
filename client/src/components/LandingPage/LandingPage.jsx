import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';



const LandingPage = () => {
  return (
    <div className="container-body">
      <div className="container-landing">
        <h1>BIENVENIDOS A DOG APP</h1>
        <Link to='home'><button>INGRESAR</button></Link>
      </div>
    </div>
  )
}


export { LandingPage }