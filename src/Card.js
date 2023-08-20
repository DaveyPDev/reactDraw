import React, { useState } from 'react';
import './Card.css';

function Card({ name, image }) {
  const [transformValues] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20
  });

  const transform = `translate(${transformValues.xPos}px, ${transformValues.yPos}px) rotate(${transformValues.angle}deg)`;

  return (
    <div className="Card">
      {/* <h3>{name}</h3> */}
      <img className="Card"
        alt={name}
        src={image}
        style={{ transform }}
      />
    </div>
  );
}

export default Card;
