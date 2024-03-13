import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);

  const showToastMessage = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        showToastMessage('Passwords do not match', 'error');
        return;
      }

      const response = await axios.post(
        `https://markdown-mern-backend.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );

      if (response.status === 200) {
        showToastMessage('Password reset successful. Please login.', 'success');
        setIsLoading(false);
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showToastMessage('Password reset failed. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div style={{textAlign:'center'}}>
      <h2>R<span style={{color:'slateblue'}}>E</span><span style={{color:'green'}}>S</span><span style={{color:'orange'}}>E</span><span style={{color:'purple'}}>T</span> P<span style={{color:'slateblue'}}>A</span><span style={{color:'green'}}>S</span><span style={{color:'orange'}}>S</span><span style={{color:'purple'}}>W</span><span style={{color:'blue'}}>O</span><span style={{color:'slateblue'}}>R</span><span style={{color:'green'}}>D</span></h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group_r">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control_r"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group_r">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control_r"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div style={{textAlign:'center'}}>
        <button type="submit" className="btn btn-primary_r">
          Reset Password
        </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
