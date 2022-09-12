import React from 'react';

const Card = (name, image, temperament, weight) => {
  return (
    <div>
      <div>
        <p>{name}</p>
        <img src={image} alt='imagen' />
      </div>
      <div>
        <p>{temperament}</p>
        <p>{weight}</p>
      </div>
    </div>
  )
};


export { Card }