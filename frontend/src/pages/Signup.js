import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Signup = props => {
  const navigate = useNavigate();
  const { signUp } = useContext(UserContext);

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (credentials.password !== credentials.confirm_password) {
        props.showAlert('Password is not match', 'danger');
        return;
      }

      const response = await signUp(
        credentials.name,
        credentials.email,
        credentials.password,
      );
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
      <h2 className="my-3">Sign Up to Note-Taking-App</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            onChange={onChange}
            type="name"
            name="name"
            className="form-control"
            id="name"
            minLength={2}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
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
            type="password"
            name="password"
            className="form-control"
            id="password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={onChange}
            type="password"
            name="confirm_password"
            className="form-control"
            id="confirm_password"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};
