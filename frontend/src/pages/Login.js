import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Login = props => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await login(credentials.email, credentials.password);
      if (response.success) {
        localStorage.setItem('token', response.authToken);
        navigate('/');
      } else {
        props.showAlert('Invalid credentials', 'danger');
      }
    } catch (error) {
      props.showAlert(error.message, 'danger');
    }
  };

  return (
    <div className="container">
      <h2 className="my-3">Login to Note-Taking-App</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={credentials.email}
            type="email"
            name="email"
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={credentials.password}
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};
