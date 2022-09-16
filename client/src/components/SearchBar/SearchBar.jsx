import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogName } from '../../action';
import './SearchBar.css';
import { FcSearch } from "react-icons/fc";


const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(name));
    setName("");
  }

  return (
    <div className="container-search">
      <input
        className="search-bar"
        onChange={e => handleInputName(e)}
        type="search"
        placeholder="Buscar Dog..."
      />
      <button className="boton-search" onClick={e => handleButtonSubmit(e)} type="submit"><FcSearch /></button>
    </div>
  )
};

export { SearchBar }