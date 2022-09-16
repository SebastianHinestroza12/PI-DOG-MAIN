import React from 'react';
import './Page.css';

const Page = ({ dogForPage, allDog, paginado }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDog / dogForPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className='paginado'>
      <ul>
        {
          pageNumber && pageNumber.map(num => (
            <li className='number' key={num}>
              <button className="btn-paginado" onClick={() => paginado(num)}>{num}</button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
};


export { Page }