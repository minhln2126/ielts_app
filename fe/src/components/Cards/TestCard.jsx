import React from 'react';

function TestCard(props) {
  return (
    <a href={`/kiem-tra/${props.id}`} className="test_card">
      <div className="card_container">
        <div className="img-container">
          <img src={props.img} alt="" />
        </div>
        <div className="name">{props.name}</div>
        <div className="time">Thời gian: {props.time}'</div>
      </div>
    </a>
  )
}

export default TestCard