"use client"
import React from 'react';
import './errorstyles.css';

const Success: React.FC = () => {
    const handleGoBack=()=>{
        window.location.href='http://localhost:3000/contactus';
    }
  return (
    <div className="error-container">
      <img src= "/error.png" className='error-image' alt='Error'></img>
      <h2 className="error-message">Invalid Email Adress</h2>
      <button className="error-button" onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export default Success;
