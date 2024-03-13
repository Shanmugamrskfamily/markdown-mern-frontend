import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('https://markdown-mern-backend.onrender.com/api/auth/forgot-password', { email });
      setSuccessMessage(response.data.message);
      console.log(response);
      setEmail('');
      setError('');
      setIsLoading(false);
      toast.success('Password Reset Mail Sent... check your mail box');
    } catch (error) {
      setError('Password reset request failed. Please try again.');
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="container_f" style={{ width: 300,textAlign:'center' }}>
      <h2>F<span style={{color:'slateblue'}}>O</span><span style={{color:'green'}}>R</span><span style={{color:'orange'}}>G</span><span style={{color:'purple'}}>O</span><span style={{color:'blue'}}>T</span> P<span style={{color:'slateblue'}}>A</span><span style={{color:'green'}}>S</span><span style={{color:'orange'}}>S</span><span style={{color:'purple'}}>W</span><span style={{color:'blue'}}>O</span><span style={{color:'slateblue'}}>R</span><span style={{color:'green'}}>D</span></h2>
      <hr />
      {successMessage && <div className="success">{successMessage}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group_f">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control_f"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary_f">
            {isLoading?'Sending Reset Mail...':'Send Reset Mail'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
