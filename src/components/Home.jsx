import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className="container home-container">
      <div className="text-center">
        <img src='./images/logo.gif' alt="MyMarkdown" className="img-fluid home-image" />
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="home-title">Welcome to Markdown Previewer Web App</h1>
          <p className="home-description">Lets Get start with Markdown editing and viewing.</p>
          <div className="home-button-container">
            <Link to="/register" className="btn btn-primary home-button">
              Register
            </Link>
            <Link to="/login" className="btn btn-success home-button">
              Login
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;