import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDog } from "../../action";
import { Card } from "../Card/Card.jsx";


const Home = () => {

  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDog());
  }

  return (
    <Fragment>
      <div>
        <button onClick={e => { handleClick(e) }}>Resetear Dog</button>


        <select>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>



        <select>
          <option value="todos">Todos</option>
          <option value="existentes">Existentes</option>
          <option value="creados">Creados</option>
        </select>

        {/* <select>
          <option value="">Filtrar Por Temperamento</option>
          {allTemp.map((temp) => (
            <option key={temp.id} value={temp.name}>{temp.name}</option>
          ))}
        </select> */}


        <select>
          <option value="Order by Weight">Ordenar Por Peso</option>
          <option value="Weight 1">Small</option>
          <option value="Weight 2">Big</option>
        </select>

        {/* {
          allDog.map(el => {
            return (
              <Link to={'/dogs/' + el.id} key={el.id}>
                <Card
                  name={el.name}
                  image={el.image}
                  temperament={el.temperament ? el.temperament : el.temperaments.map(data => data.name.concat(' '))}
                  weight={el.weight}
                />

              </Link>
            )
          })
        } */}
      </div>
    </Fragment>
  )
}


export { Home }