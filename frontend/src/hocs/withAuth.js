import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const withAuth = WrappedComponent => props => {
  const { isAuth } = useContext(UserContext);

  return (
    <>{isAuth ? <WrappedComponent {...props} /> : <Navigate to="/login" />}</>
  );
};

export default withAuth;
