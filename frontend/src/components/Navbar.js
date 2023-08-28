import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const Navbar = () => {
  const location = useLocation();
  const { logout, isAuth } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Note-Taking-App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuth && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link
                to="/signup"
                className="btn btn-outline-light mx-2"
                type="submit"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-light mx-2"
                type="submit"
              >
                Login
              </Link>
            </form>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-light mx-2"
              onClick={logout}
              type="submit"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
