import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const withGuest = WrappedComponent => props => {
  const { isAuth } = useContext(UserContext);

  return <>{!isAuth ? <WrappedComponent {...props} /> : <Navigate to="/" />}</>;
};

export default withGuest;
