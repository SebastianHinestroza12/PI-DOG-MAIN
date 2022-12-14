import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogName, getDog } from '../../action';
import './SearchBar.css';



const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog())
  }, [dispatch])


  const handleButtonSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(busqueda));
    setBusqueda("")
  }

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div className="containerInput">
      <input
        className="inputBuscar"
        value={busqueda}
        placeholder="Búsqueda Dog"
        onChange={(e) => handleChange(e)}
      />
      <button className="btn btn-dark" onClick={e => handleButtonSubmit(e)}>
        🔍
      </button>
    </div>
  )
};

export { SearchBar }