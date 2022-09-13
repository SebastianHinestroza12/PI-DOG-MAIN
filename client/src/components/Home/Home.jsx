import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDog, getTemperaments, filterDogTemperaments } from "../../action";
import { Card } from "../Card/Card.jsx";
import { Page } from "../Page/Page.jsx";


const Home = () => {

  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.dogs);
  const temp = useSelector((state) => state.temperaments)

  const [currentPage, setCurrentPage] = useState(1);
  const [dogForPage, setDogForPage] = useState(8);
  const indexOfLastDog = currentPage * dogForPage;
  const indexOfFirtDog = indexOfLastDog - dogForPage;
  const currentDog = allDog.slice(indexOfFirtDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDog());
    setCurrentPage(1);
  }

  const handleFilterDog = (e) => {
    e.preventDefault(e);
    dispatch(filterDogTemperaments(e.target.value));
    setCurrentPage(1);
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

        <select onChange={e => handleFilterDog(e)}>
          <option value="todos">Todos</option>
          {temp.map((data) => (
            <option key={data.id} value={data.name}>{data.name}</option>
          ))}
        </select>

        <select>
          <option value="Order by Weight">Ordenar Por Peso</option>
          <option value="Weight 1">Small</option>
          <option value="Weight 2">Big</option>
        </select>

        <Page
          dogForPage={dogForPage}
          allDog={allDog.length}
          paginado={paginado}
        />

        {
          currentDog.map(el => {
            return (
              <Link to={'/dogs/' + el.id} key={el.id}>
                <Card
                  name={el.name}
                  image={el.image}
                  temperament={el.temperament}
                  weight={el.weight}
                />
              </Link>
            )
          })
        }
      </div>
    </Fragment>
  )
}


export { Home }