import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../action";
import { NavBar } from ".././NavBar/NavBar";


const CreatedDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperamento = useSelector(state => state.temperaments);
  console.log(temperamento)

  const [input, setInput] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    temperaments: [],
    life_span: "",
    image: "",
  })

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(postDog());
  }, [dispatch]);
};


export { CreatedDog }