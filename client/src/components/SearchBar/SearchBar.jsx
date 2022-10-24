import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogName, getDog } from '../../action';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [dogs, setDog] = useState([]);
  console.log(dogs);
  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog())
  }, [dispatch])

  console.log(allDogs)

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(busqueda));
    setBusqueda("")
  }

  const filter = (dogBusqueda) => {
    const data = allDogs.filter(el => el.name.toLowerCase().includes(dogBusqueda.toLowerCase()));
    setDog(data);
  }

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value)
  };

  return (
    <div className="containerInput">
      <input
        className="form-control inputBuscar"
        value={busqueda}
        placeholder="Búsqueda dog por nombre"
        onChange={(e) => handleChange(e)}
      />
      <button className="btn btn-dark" onClick={e => handleButtonSubmit(e)}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
};

export { SearchBar }