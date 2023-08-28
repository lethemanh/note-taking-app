import { useState } from 'react';
import UserContext from './userContext';
import * as userApis from '../../apis/user';

const UserState = props => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('token') || false,
  );

  const login = async (email, password) => {
    const response = await userApis.login(email, password);
    setIsAuth(response.success);
    return response;
  };

  const signUp = async (name, email, password) => {
    const response = await userApis.signUp(name, email, password);
    setIsAuth(response.success);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <UserContext.Provider value={{ isAuth, login, signUp, logout }}>
      {' '}
      {
        props.children // i.e this will be available to all children of it
      }
    </UserContext.Provider>
  );
};
export default UserState;
