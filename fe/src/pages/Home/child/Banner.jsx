import React from 'react';

function Banner() {
  return (
    <div className="banner">
      <div className="img-container">
        <img className="desktop-display" src="/img/b.png" alt="" />
        <img className="mobile-display" src="/img/banner3.png" alt="" />
      </div>
      <div className="category">
        <a href="/de-thi?type=reading" >
          <label><i className="fas fa-glasses"></i></label>
          Reading Test
        </a>
        <a href="/de-thi?type=listening" >
          <label><i className="fas fa-headphones-alt"></i></label>
          Listening Test
        </a>
        <a href="/de-thi" >
          <label><i className="fas fa-pencil-alt"></i></label>
          Writing Test
        </a>
        <a href="/de-thi" >
          <label><i className="fas fa-microphone-alt"></i></label>
          Speaking Test
        </a>
      </div>
    </div>
  )
}

export default Banner