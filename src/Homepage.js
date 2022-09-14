import React from 'react';
import logo from './logo.svg';
import './Homepage.css';

function Homepage() {
  return (
    <div className="Homepage">
      <header className="Homepage-header">
        <img src={logo} className="Homepage-logo" alt="logo" />
        <h1>
          Water Quiz App
        </h1>
        <button className='Quiz-button'>
          Quiz Example
        </button>
        <p>
          Created by<br />
          Rollins Baird, Thomas Hampton, and Sam Hertzler<br />
          in conjuction with<br />
          Dr. Burian, Dr. Halgren, and the National Water Institute.<br />
        </p>
      </header>
    </div>
  );
}

export default Homepage;