import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ActivateAccount() {
  const [query]  = useSearchParams();
  const navigate = useNavigate();
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`https://markdown-mern-backend.onrender.com/api/auth/activate/${query.get('token')}`);
        toast.success('Account Activated!');
        setIsActivated(true);
        navigate('/login');
      } catch (error) {
        toast.error('Account activation failed. Please try again.')
        setError('Account activation failed. Please try again.');
      }
    };

    if (query.get('token')) {
      activateAccount();
    }
  }, [query.get('token'), navigate]);

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
