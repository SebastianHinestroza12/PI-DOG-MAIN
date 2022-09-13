import React from 'react';

const Card = ({ name, image, temperament, weight }) => {
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <img src={image} alt='imagen' width="240px" height="180px" />
        <p>{temperament}</p>
        <p>{weight}</p>
      </div>
    </div>
  )
};


export { Card }