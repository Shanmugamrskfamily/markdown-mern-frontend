import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    // After logging out, navigate the user to the home page 
    navigate('/');
  };
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-container">
      <div>
        <Link className="navbar-brand" to="/"><img src="/images/LongLogo.png" style={{width:'200px',height:'150'}} alt="" /></Link>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Markdown</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">Markdown List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chart">View Chart BiSolidHomeHeart</Link>
              </li>
              <li>
                <button className="btn btn-outline-danger custom-btn" style={{ marginLeft: 250 }} onClick={logout}>Logout <PowerSettingsNewIcon color="warning" fontSize="large" className="nav-links"/></button>
              </li> 
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register <HowToRegIcon color="success" fontSize="large" className="nav-links" /></Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login <LoginIcon color="success" fontSize="large" className="nav-links" /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home <HomeIcon color="primary" fontSize="large" className="nav-links" /></Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
