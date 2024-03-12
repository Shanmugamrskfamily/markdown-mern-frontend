import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://markdown-mern-backend.onrender.com/api/auth/forgot-password', { email });
      setSuccessMessage(response.data.message);
      console.log(response);
      setEmail('');
      setError('');
    } catch (error) {
      setError('Password reset request failed. Please try again.');
    }
  };

  return (
    <div className="container_f" style={{ width: 300 }}>
      <h2>Forgot Password</h2>
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
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
