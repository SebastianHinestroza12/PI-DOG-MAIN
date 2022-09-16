import React from 'react';
import './Card.css';

const Card = ({ name, image, temperament, weightMin, weightMax }) => {
  return (
    <div className="card-container">
      <div className='card'>
        <h2>{name}</h2>
        <img className="image-card" src={image} alt='imagen' />
        <p className='card-temperamentos'>{temperament}</p>
        <p className='card-peso'>{`${weightMin} - ${weightMax} Kg`}</p>
      </div>
    </div>
  )
};


export { Card }