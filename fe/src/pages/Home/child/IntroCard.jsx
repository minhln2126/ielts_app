import React from 'react';
export default function IntroCard(props) {
  return (
    <div className="skill-card">
      <div className="img-container">
        <img src={props.image} alt="" />
      </div>
      <div className="name">{props.name}</div>
      <p className="skill-description">{props.description}</p>
    </div>
  )
}