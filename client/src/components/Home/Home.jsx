import React, { Fragment, StrictMode } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDog, getTemperaments, filterDogTemperaments, filterDogCreated, orderByName, orderByWeight } from "../../action";
import { Card } from "../Card/Card.jsx";
import { Page } from "../Page/Page.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import './Home.css';


const Home = () => {

  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.dogs);
  const temp = useSelector((state) => state.temperaments)

  const appTopRef = useRef();
  const [orden, setOrden] = useState('');
  console.log(orden);
  console.log(getTemperaments);


  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [productsPerPage, setproductsPerPage] = useState(9); //cuantos products por page
  const indexOfLastproduct = actualPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
  const actualproducts = allDog.slice(
    indexOfFirstproduct,
    indexOfLastproduct
  ); //recortamos el arreglo con todos los products
  const [minPageNumber, setMinPageNumber] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  console.log(setproductsPerPage)


  // console.log(setDogForPage);
  // console.log(orden);

  const pages = (pageNumber) => {
    setActualPage(pageNumber);
    appTopRef.current?.scrollIntoView({ behavior: "smooth" });
    if (pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber + 4);
      setMaxPageNumber(maxPageNumber + 4);
    } else if (pageNumber <= minPageNumber + 1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber - 4);
      setMaxPageNumber(maxPageNumber - 4);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDog());
    setActualPage(1);
  };

  const handleFilterDog = (e) => {
    e.preventDefault(e);
    dispatch(filterDogTemperaments(e.target.value));
    setActualPage(1);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault(e);
    dispatch(filterDogCreated(e.target.value));
    setActualPage(1);
  };

  const handleOrderByName = (e) => {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setActualPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };
  const handleOrderByPeso = (e) => {
    e.preventDefault(e);
    dispatch(orderByWeight(e.target.value));
    setActualPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <Fragment>

      <div>
        <NavBar />
        <div className="container-filtro">
          <div className="container-item ">
            <button className="btn-home" onClick={e => { handleClick(e) }}>Resetear</button>
          </div>
          <div className="container-item select-home">
            <p className="p-home">Ordenamiento Alfabetico</p>
            <select onChange={e => handleOrderByName(e)}>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
            <i></i>
          </div>

          <div className="container-item select-home">
            <p className="p-home">Ordenamiento Por Peso</p>
            <select onChange={e => handleOrderByPeso(e)}>
              <option value="liviano">Livianos</option>
              <option value="pesado">Pesados</option>
            </select>
            <i></i>
          </div>

          <div className="container-item select-home">
            <p className="p-home">Filtro Creados O Existentes</p>
            <select onChange={e => handleFilterCreated(e)}>
              <option value="todos">Todos</option>
              <option value="existentes">Existentes</option>
              <option value="creados">Creados</option>
            </select>
            <i></i>
          </div>

          <div className="container-item select-home">
            <p className="p-home">Filtro Por Temperamento</p>
            <select onChange={e => handleFilterDog(e)}>
              <option value="todos">Todos</option>
              {temp.map((data) => (
                <option key={data.id} value={data.name}>{data.name}</option>
              ))}
            </select>
            <i></i>
          </div>
        </div>

        <Page
          actualPage={actualPage}
          minPageNumber={minPageNumber}
          maxPageNumber={maxPageNumber}
          productsPerPage={productsPerPage}
          products={Array.isArray(allDog) ? allDog.length : 1}
          pages={pages}
        />

        <StrictMode>

          {
            actualproducts.map(el => {
              return (
                <Link className="linktohome" to={'/dogs/' + el.id} key={el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    weightMin={el.weightMin}
                    weightMax={el.weightMax}
                  />
                </Link>
              )
            })
          }

        </StrictMode>

      </div>
    </Fragment>
  )
}


export { Home }