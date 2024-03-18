"use client"
import React from 'react';
import './styles.css';

const Success: React.FC = () => {
    const handleGoBack=()=>{
        window.location.href='http://localhost:3000/contactus';
    }
  return (
    <div className="success-container">
      <img src= "/success.png" className='success-image' alt='Success'></img>
      <h2 className="success-message">Form successfully submitted</h2>
      <button className="success-button" onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export default Success;
