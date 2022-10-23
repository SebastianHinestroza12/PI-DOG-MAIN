import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDog, getTemperaments } from "../../action";
import { useDispatch } from "react-redux";
import './LandingPage.css';



const LandingPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog());
    dispatch(getTemperaments());
  }, [dispatch]);

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