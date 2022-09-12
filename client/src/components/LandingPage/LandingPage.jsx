import React from "react";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div>
      <h1>BIENVENIDOS A DOG APP</h1>
      <Link to='home'><button>INGRESAR</button></Link>
    </div>
  )
}



export { LandingPage }