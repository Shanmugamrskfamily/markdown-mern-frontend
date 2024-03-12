import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const showToastMessage = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setIsEmailValid(value.length !== 0);
    
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setIsPasswordValid(value.length !== 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(
        formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        isEmailValid &&
        isPasswordValid 
      ) {
        const response = await axios.post(
          'https://markdown-mern-backend.onrender.com/api/auth/login',
          formData
        );
        
        localStorage.setItem('token',response.data.token);

        setFormData(initialFormData);
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/create');
        }, 2000);
        showToastMessage('Login successful', 'success');

      }else {
        showToastMessage('Please fill in all required fields', 'error');
      }
     } catch (error) {
      console.error('Error logging in:', error);
      showToastMessage('Invalid Email or password', 'error');
    }
  };


  return (
    <div className="container" style={{ width: 300 }}>
      <h2><span style={{color:'red'}}>L</span> <span style={{color:'slateblue'}}>O</span> <span style={{color:'green'}}>G</span> <span style={{color:'orange'}}>I</span> <span style={{color:'purple'}}>N</span> </h2>
     <hr /> <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{fontWeight:'bold'}}>Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
        </div>
        {!isEmailValid && <div className="error">Please enter valid Email.</div>}
        <div className="form-group">
          <label htmlFor="password" style={{fontWeight:'bold'}}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
        </div>

        {!isPasswordValid && (
          <div className="error">Please Enter password.</div>
        )}

        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;