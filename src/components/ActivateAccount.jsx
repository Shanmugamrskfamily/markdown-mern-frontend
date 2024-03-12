import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActivateAccount() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`https://markdown-mern-backend.onrender.com/api/auth/activate/${token}`);
        setIsActivated(true);        
        navigate('/login');
      } catch (error) {
        setError('Account activation failed. Please try again.');
      }
    };

    if (token) {
      activateAccount();
    }
  }, [token, navigate]);

  return (
    <div>
      {isActivated ? (
        <p>Your account has been successfully activated. Please proceed to login.</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default ActivateAccount;
